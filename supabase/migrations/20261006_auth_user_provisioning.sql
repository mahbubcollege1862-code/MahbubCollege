-- ==============================================================================
-- Migration: Stored Procedure for Automatic Alumni Auth User Provisioning
-- Creates verified users in auth.users and auth.identities
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.provision_alumni_auth_user(
    p_phone text,
    p_full_name text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
DECLARE
    v_user_id uuid;
    v_phone text;
BEGIN
    -- Ensure E.164 phone formatting (+91...)
    IF p_phone NOT LIKE '+%' THEN
        v_phone := '+' || p_phone;
    ELSE
        v_phone := p_phone;
    END IF;

    -- 1. Check if user already exists in auth.users
    SELECT id INTO v_user_id FROM auth.users WHERE phone = v_phone LIMIT 1;
    IF v_user_id IS NOT NULL THEN
        -- Ensure identity also exists if user was previously created
        IF NOT EXISTS (SELECT 1 FROM auth.identities WHERE user_id = v_user_id) THEN
            INSERT INTO auth.identities (
                id,
                provider_id,
                user_id,
                identity_data,
                provider,
                last_sign_in_at,
                created_at,
                updated_at
            ) VALUES (
                gen_random_uuid(),
                v_phone,
                v_user_id,
                jsonb_build_object('sub', v_user_id::text, 'phone', v_phone),
                'phone',
                now(),
                now(),
                now()
            );
        END IF;
        RETURN v_user_id;
    END IF;

    -- 2. Generate new UUID for the auth user
    v_user_id := gen_random_uuid();

    -- 3. Insert into auth.users with phone confirmed (confirmed_at is a generated column in Supabase)
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        phone,
        phone_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        v_user_id,
        'authenticated',
        'authenticated',
        NULL,
        v_phone,
        now(),
        '{"provider": "phone", "providers": ["phone"]}'::jsonb,
        jsonb_build_object('full_name', p_full_name, 'phone', v_phone, 'role', 'alumni'),
        now(),
        now()
    );

    -- 4. Insert into auth.identities (Required by GoTrue to display in Dashboard & allow phone auth)
    INSERT INTO auth.identities (
        id,
        provider_id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        v_phone,
        v_user_id,
        jsonb_build_object('sub', v_user_id::text, 'phone', v_phone),
        'phone',
        now(),
        now(),
        now()
    );

    RETURN v_user_id;
END;
$$;

-- Grant execution permissions
GRANT EXECUTE ON FUNCTION public.provision_alumni_auth_user(text, text) TO authenticated, service_role, anon;
