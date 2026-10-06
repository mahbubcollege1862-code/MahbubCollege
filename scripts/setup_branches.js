const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

const defaultBranches = [
  { name: 'Anglo Vernacular High School', order: 1 },
  { name: 'Mahbub Junior College', order: 2 },
  { name: 'Mahbub Degree College (Arts & Commerce)', order: 3 },
  { name: 'Mahbub Degree College (Science)', order: 4 },
  { name: 'Mahbub PG College (MBA / MCA)', order: 5 },
  { name: 'Other / Historic Institution', order: 6 }
];

async function setup() {
  await client.connect();
  console.log('Connected to Postgres.');

  // Create branches table if not exists
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.branches (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);
  console.log('branches table ensured.');

  // Enable RLS
  await client.query(`
    ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
  `);

  // Create public read policy if not exists
  await client.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'branches' AND policyname = 'Allow public read access on branches'
      ) THEN
        CREATE POLICY "Allow public read access on branches" 
        ON public.branches FOR SELECT USING (is_active = true);
      END IF;
    END $$;
  `);
  console.log('RLS policy configured.');

  // Check existing count
  const existing = await client.query('SELECT count(*) FROM public.branches');
  if (parseInt(existing.rows[0].count, 10) === 0) {
    console.log('Inserting default branches...');
    for (const b of defaultBranches) {
      await client.query(
        'INSERT INTO public.branches (name, display_order, is_active) VALUES ($1, $2, true)',
        [b.name, b.order]
      );
    }
  }

  const res = await client.query('SELECT id, name, display_order FROM public.branches ORDER BY display_order');
  console.log('Current branches in database:');
  console.table(res.rows);

  await client.end();
}

setup().catch(console.error);
