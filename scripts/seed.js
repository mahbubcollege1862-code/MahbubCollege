const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqwxpivtkevcqantxrcl.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const DB_CONNECTION = process.env.DATABASE_URL || '';

const ASSETS_ROOT = 'C:\\Work\\Mahbub\\Mahbub College Assets';

// 1. Legacy Builders (15 items)
const legacyItems = [
  { order: 1, name: 'P. Somasundaram Mudaliar', title: 'Visionary Philanthropist', file: 'OurLegacy_P. Somasundaram Mudaliar.png', clean: 'somasundaram_mudaliar.png' },
  { order: 2, name: 'Mir Mahbub Ali Khan', title: 'Sixth Nizam of Hyderabad', file: 'OurLegacy_Mir Mahbub Ali Khan.png', clean: 'mir_mahbub_ali_khan.png' },
  { order: 3, name: 'H.E.H. Mir Osman Ali khan', title: 'Asaf Jah VI 1911 - 1948', file: 'OurLegacy_H.E.H. Mir Osman Ali khan.png', clean: 'mir_osman_ali_khan.png' },
  { order: 4, name: 'H.H. Mir Turab Ali Khan', title: 'Salar Jung 1', file: 'OurLegacy_H.H. Mir Turab Ali Khan.png', clean: 'mir_turab_ali_khan.png' },
  { order: 5, name: 'Rai Saheb Chidura Durvasulu', title: 'Donor of Centenary Building - 1962', file: 'OurLegacy_Rai Saheb Chidura Durvasulu.png', clean: 'chidura_durvasulu.png' },
  { order: 6, name: 'R.S.M Venkatakistayya', title: 'Donor', file: 'OurLegacy_R.S.M Venkatakistayya.png', clean: 'rsm_venkatakistayya.png' },
  { order: 7, name: 'Khan Bahadur A.K. Babu Khan', title: 'Committee Member and Donor', file: 'OurLegacy_Khan Bahadur A.K. Babu Khan.png', clean: 'ak_babu_khan.png' },
  { order: 8, name: 'S. Elliah', title: 'Donor', file: 'OurLegacy_S. Elliah.png', clean: 's_elliah.png' },
  { order: 9, name: 'A. Nagavendra Rao', title: 'Donor', file: 'OurLegacy_A. Nagavendra Rao.png', clean: 'a_nagavendra_rao.png' },
  { order: 10, name: 'Rao Saheb C.K. Durvasula', title: 'Donor', file: 'OurLegacy_Rao Saheb C.K. Durvasula.png', clean: 'ck_durvasula.png' },
  { order: 11, name: 'P. Rajabahadur Pillay', title: 'Donor', file: 'OurLegacy_P. Rajabahadur Pillay.png', clean: 'p_rajabahadur_pillay.png' },
  { order: 12, name: 'Rao Saheb Burgu Mahadev', title: 'Donor', file: 'OurLegacy_Rao Saheb Burgu Mahadev.png', clean: 'burgu_mahadev.png' },
  { order: 13, name: 'Nadirshaw B. Chenoy', title: 'Donor', file: 'OurLegacy_Nadirshaw B. Chenoy.png', clean: 'nadirshaw_b_chenoy.png' },
  { order: 14, name: 'A. Srinivasa Mudaliar', title: 'Donor', file: 'OurLegacy_A. Srinivasa Mudaliar.png', clean: 'a_srinivasa_mudaliar.png' },
  { order: 15, name: 'Rai Kanti Hanumaiah Gupta', title: 'Donor', file: 'OurLegacy_Rai Kanti Hanumaiah Gupta.png', clean: 'kanti_hanumaiah_gupta.png' }
];

// 2. Leaders / Headmasters & Principals (21 items)
const headmasterItems = [
  { order: 1, name: 'Singaravelu Mudaliar', title: '1875', file: 'leaders_Singaravelu Mudaliar.png', clean: 'singaravelu_mudaliar.png' },
  { order: 2, name: 'S.M. Kelly', title: '1882 - 1883', file: 'leaders_S.M. Kelly.png', clean: 'sm_kelly.png' },
  { order: 3, name: 'J. Zaccheus', title: '1891 - 1899', file: 'leaders_J. Zaccheus.png', clean: 'j_zaccheus.png' },
  { order: 4, name: 'D.B.R. Venkataratnam Naidu', title: '1889–1894', file: 'leaders_D.B.R. Venkataratnam Naidu.png', clean: 'dbr_venkataratnam_naidu.png' },
  { order: 5, name: 'V. Ramanujam Pillay', title: '1905 - 1907', file: 'leaders_V. Ramanujam Pillay.png', clean: 'v_ramanujam_pillay.png' },
  { order: 6, name: 'T.K Bappu', title: '1907 - 1910', file: 'leaders_T.K Bappu.png', clean: 'tk_bappu.png' },
  { order: 7, name: 'S. Alagappa Mudaliar', title: '1911 - 1915', file: 'leaders_S. Alagappa Mudaliar.png', clean: 's_alagappa_mudaliar.png' },
  { order: 8, name: 'M. Hanumanth Naidu', title: '1919 - 1943', file: 'leaders_M. Hanumanth Naidu.png', clean: 'm_hanumanth_naidu.png' },
  { order: 9, name: 'M. S. Kotiswaran', title: '1943 - 1960', file: 'leaders_M. S. Kotiswaran.png', clean: 'ms_kotiswaran.png' },
  { order: 10, name: 'E. Veeraswamy', title: '1960 - 1974', file: 'leaders_E. Veeraswamy.png', clean: 'e_veeraswamy.png' },
  { order: 11, name: 'C. Venkat Rao', title: '1974 - 1983', file: 'leaders_C. Venkat Rao.png', clean: 'c_venkat_rao.png' },
  { order: 12, name: 'G. Krishna Rao', title: '1983 - 1990', file: 'leaders_G. Krishna Rao.png', clean: 'g_krishna_rao.png' },
  { order: 13, name: 'G. Bhojaraj', title: '1990 - 1992', file: 'leaders_G. Bhojaraj.png', clean: 'g_bhojaraj.png' },
  { order: 14, name: 'K. Rama Rao', title: '1992 - 1996', file: 'leaders_K. Rama Rao.png', clean: 'k_rama_rao.png' },
  { order: 15, name: 'K.V. Chenna Chary', title: '1996 - 1999', file: 'leaders_K.V. Chenna Chary.png', clean: 'kv_chenna_chary.png' },
  { order: 16, name: 'M. Babu Rao', title: '1999 - 2002', file: 'leaders_M. Babu rao.png', clean: 'm_babu_rao.png' },
  { order: 17, name: 'V.B. Usha Devi', title: '2002 - 2003', file: 'leaders_V.B. Usha Devi.png', clean: 'vb_usha_devi.png' },
  { order: 18, name: 'B. Karunamayi', title: '2003 - 2005', file: 'leaders_B. Karunamayi.png', clean: 'b_karunamayi.png' },
  { order: 19, name: 'S.A. Prema Kumari', title: '2005 - 2006', file: 'leaders_S.A. Prema Kumari.png', clean: 'sa_prema_kumari.png' },
  { order: 20, name: 'K.J. Venkateshwar Rao', title: '2006 - 2024', file: 'leaders_K.J. Venkateshwar Rao.png', clean: 'kj_venkateshwar_rao.png' },
  { order: 21, name: 'C. YADAGIRI', title: '2024 - 2026', file: 'leaders_C. YADAGIRI.png', clean: 'c_yadagiri.png' }
];

// 3. Committee Members (22 items)
const committeeItems = [
  { order: 1, name: 'DEWAN BHADUR C.V. PADMA RAO MUDALIAR', title: 'Honorary Secretary 1918-1933 | President 1933-34', file: 'committee_DEWAN BHADUR C.V. PADMA RAO MUDALIAR.png', clean: 'cv_padma_rao_mudaliar.png' },
  { order: 2, name: 'Mr. ANNASWAMY MUDALIAR', title: 'Honorary Secretary, 1878-1880', file: 'committee_Mr. ANNASWAMY MUDALIAR.png', clean: 'annaswamy_mudaliar.png' },
  { order: 3, name: 'M. C.C. PAUL', title: 'President 1935-1938 & 1939-1940', file: 'committee_M. C.C. PAUL.png', clean: 'm_cc_paul.png' },
  { order: 4, name: 'Mr. M. NARAYANSWAMY MUDALIAR', title: 'Honorary Secretary, 1881-1884', file: 'committee_Mr. M. NARAYANSWAMY MUDALIAR.png', clean: 'm_narayanswamy_mudaliar.png' },
  { order: 5, name: 'Mr. A. VENUGOPAL PILLAY', title: 'Honorary Secretary, 1884-1885', file: 'committee_Mr. A. VENUGOPAL PILLAY.png', clean: 'a_venugopal_pillay.png' },
  { order: 6, name: 'Mr. P. RAMACHANDRA PILLAY', title: 'Honorary Secretary, 1885-1902', file: 'committee_Mr. P. RAMACHANDRA PILLAY.png', clean: 'p_ramachandra_pillay.png' },
  { order: 7, name: 'C. VARDARAJOO MUDALIAR', title: 'Honorary Secretary, 1902-1916', file: 'committee_C. VARDARAJOO MUDALIAR.png', clean: 'c_vardarajoo_mudaliar.png' },
  { order: 8, name: 'Mr. A.V. PATTABIRAM', title: 'Honorary Secretary and Donor 1942-1948', file: 'committee_Mr. A.V. PATTABIRAM.png', clean: 'av_pattabiram.png' },
  { order: 9, name: 'L. GANGADHARAM', title: 'Honorary Joint Secretary 1962-1965', file: 'committee_L. GANGADHARAM.png', clean: 'l_gangadharam.png' },
  { order: 10, name: 'KHAN BAHADUR ABDUL KARIM BABU KHAN', title: 'Committee Member and Donor', file: 'committee_KHAN BAHADUR ABDUL KARIM BABU KHAN.png', clean: 'abdul_karim_babu_khan.png' },
  { order: 11, name: 'A. RAMASWAMY IYENGAR', title: 'Committee Member', file: 'committee_A. RAMASWAMY IYENGAR.png', clean: 'a_ramaswamy_iyengar.png' },
  { order: 12, name: 'Z.R. RANJI', title: 'Committee Member', file: 'committee_Z.R. RANJI.png', clean: 'zr_ranji.png' },
  { order: 13, name: 'Mr. M. RAJENDRA NAIDU', title: 'Committee Member', file: 'committee_Mr. M. RAJENDRA NAIDU.png', clean: 'm_rajendra_naidu.png' },
  { order: 14, name: 'Mr. P. MASILAMANI', title: 'Committee Member', file: 'committee_Mr. P. MASILAMANI.png', clean: 'p_masilamani.png' },
  { order: 15, name: 'RAO BAHADUR A.J. VEERASWAMY', title: 'Committee Member', file: 'committee_RAO BAHADUR A.J. VEERASWAMY.png', clean: 'aj_veeraswamy.png' },
  { order: 16, name: 'Mr. N.S. RAGHAVAN', title: 'Committee Member', file: 'committee_Mr. N.S. RAGHAVAN.png', clean: 'ns_raghavan.png' },
  { order: 17, name: 'MAJOR N.K. GURUSWAMY, I.A.S', title: 'Committee Member', file: 'committee_MAJOR N.K. GURUSWAMY,  I.A.S.png', clean: 'nk_guruswamy.png' },
  { order: 18, name: 'Mr. C.S. KRISHNASWAMY MUDALIAR', title: 'Committee Member', file: 'committee_Mr. C.S. KRISHNASWAMY MUDALIAR.png', clean: 'cs_krishnaswamy_mudaliar.png' },
  { order: 19, name: 'Mr. K.T. NARASIMHACHAR', title: 'Committee Member', file: 'committee_Mr. K.T. NARASIMHACHAR.png', clean: 'kt_narasimhachar.png' },
  { order: 20, name: 'Mr. C.V.K. SRINIVASULU', title: 'Committee Member', file: 'committee_Mr. C.V.K. SRINIVASULU.png', clean: 'cvk_srinivasulu.png' },
  { order: 21, name: 'Dewan Bhadur A. Venugopal', title: 'Honorary Secretary 1938 - 1942', file: 'committee_Dewan Bhadur A. Venugopal.png', clean: 'dewan_bhadur_a_venugopal.png' },
  { order: 22, name: 'A.H Venkat rao', title: 'Honorary Secretary 1948 - 1955', file: 'committee_A.H Venkat rao.png', clean: 'ah_venkat_rao.png' }
];

// 4. News and Updates (8 items)
const newsItems = [
  { order: 1, title: 'MahbubCollege to commemorate 150 years with Vivekananda Ratha-Yatra', secondary_text: 'Celebration & Commemoration', file: 'MahbubCollege to commemorate 150 years with Vivekananda Ratha-Yatra.png', clean: 'commemorate_150_years.png' },
  { order: 2, title: 'MahbubCollege has an illustrious past. From giving the nation pioneers and stalwarts', secondary_text: 'Institutional Heritage', file: 'MahbubCollege has an illustrious past. From giving the nation.png', clean: 'illustrious_past.png' },
  { order: 3, title: 'Alumni are planning to make representations to concerned authorities in the government...', secondary_text: 'Alumni Action', file: 'Alumni are planning to make representations to concerned authorities in the government....png', clean: 'alumni_representations.png' },
  { order: 4, title: 'Mahbub College Complains To Governor Against JNTUH', secondary_text: 'Governance & Media', file: 'Mahbub College Complains To Governor Against JNTUH.png', clean: 'complaint_governor.png' },
  { order: 5, title: 'Mahbub Education Institution gets Telangana High Court protection', secondary_text: 'High Court Injunction', file: 'Mahbub Education Institution gets Telangana High Court protection.png', clean: 'high_court_protection.png' },
  { order: 6, title: 'Tussle over Mahbub College: High Court passes injunction order', secondary_text: 'Legal Victory', file: 'Tussle over Mahbub College_ High Court passes injunction order.png', clean: 'court_injunction_order.png' },
  { order: 7, title: 'Alumni association of Mahbub College conducted an emergency meeting on Monday to discuss...', secondary_text: 'Emergency Alumni Assembly', file: 'Alumni association of Mahbub College conducted an emergency meeting on Monday to discuss....png', clean: 'emergency_meeting.png' },
  { order: 8, title: 'Alumni appeal to state government to protect historic campus and assets', secondary_text: 'Campus Preservation', file: 'Alumni are planning to make representations to concerned authorities in the government...-1.png', clean: 'campus_protection_appeal.png' }
];

// 5. Gallery (6 items)
const galleryItems = [
  { order: 1, name: 'All India Boys Scout Conference 1920 - 1921', file: 'All India Boys Scout Conference 1920 - 1921.png', clean: 'boys_scout_conference_1920.png' },
  { order: 2, name: 'Scouts & Guides with the British Unit Officer - 1930', file: 'Scouts & Guides with the British Unit Officer - 1930.png', clean: 'scouts_guides_british_officer_1930.png' },
  { order: 3, name: 'Scouts & Clubs of MCHS - 1930', file: 'Scouts & Clubs of MCHS - 1930.png', clean: 'scouts_clubs_mchs_1930.png' },
  { order: 4, name: 'Boxing 1942', file: 'Boxing 1942.png', clean: 'boxing_1942.png' },
  { order: 5, name: 'Hokey Batch 1942 - 1943', file: 'Hokey Batch 1942 - 1943.png', clean: 'hockey_batch_1942.png' },
  { order: 6, name: 'Tennikoit Match 1942 - 1943', file: 'Tennikoit Match 1942 - 1943.png', clean: 'tennikoit_match_1942.png' }
];

async function main() {
  const pgClient = new Client({
    connectionString: DB_CONNECTION,
    ssl: { rejectUnauthorized: false }
  });

  await pgClient.connect();
  console.log('Connected to PostgreSQL.');

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // ----------------------------------------------------------------------
  // 1. SETUP TABLES (Simple IDs, no UUIDs, minimal columns as requested)
  // ----------------------------------------------------------------------
  console.log('\n--- CREATING/UPDATING MINIMAL SUPABASE TABLES ---');
  
  await pgClient.query(`
    -- 1. legacy_builders
    DROP TABLE IF EXISTS public.legacy_builders CASCADE;
    CREATE TABLE public.legacy_builders (
      id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      photo_url TEXT NOT NULL,
      display_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT true
    );
    ALTER TABLE public.legacy_builders ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public read on legacy_builders" ON public.legacy_builders;
    CREATE POLICY "Allow public read on legacy_builders" ON public.legacy_builders FOR SELECT USING (is_active = true);
    DROP POLICY IF EXISTS "Allow auth all on legacy_builders" ON public.legacy_builders;
    CREATE POLICY "Allow auth all on legacy_builders" ON public.legacy_builders FOR ALL TO authenticated USING (true) WITH CHECK (true);

    -- 2. leaders (principals & committee)
    DROP TABLE IF EXISTS public.leaders CASCADE;
    CREATE TABLE public.leaders (
      id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL, -- 'headmaster' or 'committee'
      photo_url TEXT NOT NULL,
      display_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT true
    );
    ALTER TABLE public.leaders ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public read on leaders" ON public.leaders;
    CREATE POLICY "Allow public read on leaders" ON public.leaders FOR SELECT USING (is_active = true);
    DROP POLICY IF EXISTS "Allow auth all on leaders" ON public.leaders;
    CREATE POLICY "Allow auth all on leaders" ON public.leaders FOR ALL TO authenticated USING (true) WITH CHECK (true);

    -- 3. news_and_updates
    DROP TABLE IF EXISTS public.news_and_updates CASCADE;
    CREATE TABLE public.news_and_updates (
      id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      title TEXT NOT NULL,
      secondary_text TEXT,
      photo_url TEXT NOT NULL,
      display_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT true
    );
    ALTER TABLE public.news_and_updates ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public read on news_and_updates" ON public.news_and_updates;
    CREATE POLICY "Allow public read on news_and_updates" ON public.news_and_updates FOR SELECT USING (is_active = true);
    DROP POLICY IF EXISTS "Allow auth all on news_and_updates" ON public.news_and_updates;
    CREATE POLICY "Allow auth all on news_and_updates" ON public.news_and_updates FOR ALL TO authenticated USING (true) WITH CHECK (true);

    -- 4. gallery
    DROP TABLE IF EXISTS public.gallery CASCADE;
    CREATE TABLE public.gallery (
      id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      photo_url TEXT NOT NULL,
      display_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT true
    );
    ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public read on gallery" ON public.gallery;
    CREATE POLICY "Allow public read on gallery" ON public.gallery FOR SELECT USING (is_active = true);
    DROP POLICY IF EXISTS "Allow auth all on gallery" ON public.gallery;
    CREATE POLICY "Allow auth all on gallery" ON public.gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);

    -- 5. registrations (Contact form)
    DROP TABLE IF EXISTS public.registrations CASCADE;
    CREATE TABLE public.registrations (
      id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      full_name TEXT NOT NULL,
      relative_name TEXT,
      dob TEXT,
      branch TEXT,
      batch_year TEXT,
      phone TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );
    ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public insert on registrations" ON public.registrations;
    CREATE POLICY "Allow public insert on registrations" ON public.registrations FOR INSERT WITH CHECK (true);
    DROP POLICY IF EXISTS "Allow public select on registrations" ON public.registrations;
    CREATE POLICY "Allow public select on registrations" ON public.registrations FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Allow auth all on registrations" ON public.registrations;
    CREATE POLICY "Allow auth all on registrations" ON public.registrations FOR ALL TO authenticated USING (true) WITH CHECK (true);
  `);
  console.log('Tables created successfully with clean simple schema.');

  // Helper upload function
  async function uploadGroup(items, assetFolder, storageSubfolder, insertQuery) {
    console.log(`\nUploading ${items.length} items from "${assetFolder}" to "media/${storageSubfolder}"...`);
    const localDir = path.join(__dirname, '..', 'public', 'media', storageSubfolder);
    fs.mkdirSync(localDir, { recursive: true });

    for (const item of items) {
      const filePath = path.join(ASSETS_ROOT, assetFolder, item.file);
      if (!fs.existsSync(filePath)) {
        console.warn(`File missing: ${filePath}`);
        continue;
      }

      const fileBuffer = fs.readFileSync(filePath);
      const storagePath = `${storageSubfolder}/${item.clean}`;

      // Upload to Supabase Storage: bucket 'media'
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(storagePath, fileBuffer, {
          contentType: 'image/png',
          upsert: true
        });

      if (uploadError) {
        console.error(`Failed uploading ${item.clean}:`, uploadError.message);
      }

      const { data: pubData } = supabase.storage
        .from('media')
        .getPublicUrl(storagePath);

      const publicUrl = pubData.publicUrl;

      // Copy to public/media/...
      fs.copyFileSync(filePath, path.join(localDir, item.clean));

      // Insert row into database
      await insertQuery(item, publicUrl);
    }
  }

  // 1. Upload Legacy
  await uploadGroup(legacyItems, 'Our Legacy', 'legacy', async (item, publicUrl) => {
    await pgClient.query(
      'INSERT INTO public.legacy_builders (name, title, photo_url, display_order) VALUES ($1, $2, $3, $4)',
      [item.name, item.title, publicUrl, item.order]
    );
  });

  // 2. Upload Headmasters
  await uploadGroup(headmasterItems, 'Leaders', 'leaders', async (item, publicUrl) => {
    await pgClient.query(
      'INSERT INTO public.leaders (name, title, category, photo_url, display_order) VALUES ($1, $2, $3, $4, $5)',
      [item.name, item.title, 'headmaster', publicUrl, item.order]
    );
  });

  // 3. Upload Committee Members
  await uploadGroup(committeeItems, 'Committee Memebers', 'committee', async (item, publicUrl) => {
    await pgClient.query(
      'INSERT INTO public.leaders (name, title, category, photo_url, display_order) VALUES ($1, $2, $3, $4, $5)',
      [item.name, item.title, 'committee', publicUrl, item.order]
    );
  });

  // 4. Upload News
  await uploadGroup(newsItems, 'News And Updates', 'news', async (item, publicUrl) => {
    await pgClient.query(
      'INSERT INTO public.news_and_updates (title, secondary_text, photo_url, display_order) VALUES ($1, $2, $3, $4)',
      [item.title, item.secondary_text, publicUrl, item.order]
    );
  });

  // 5. Upload Gallery
  await uploadGroup(galleryItems, 'Gallery', 'gallery', async (item, publicUrl) => {
    await pgClient.query(
      'INSERT INTO public.gallery (name, photo_url, display_order) VALUES ($1, $2, $3)',
      [item.name, publicUrl, item.order]
    );
  });

  // Verification counts
  console.log('\n--- VERIFYING ROW COUNTS IN SUPABASE ---');
  const countLegacy = await pgClient.query('SELECT count(*) FROM public.legacy_builders');
  const countLeaders = await pgClient.query('SELECT category, count(*) FROM public.leaders GROUP BY category');
  const countNews = await pgClient.query('SELECT count(*) FROM public.news_and_updates');
  const countGallery = await pgClient.query('SELECT count(*) FROM public.gallery');
  const countFormer = await pgClient.query('SELECT count(*) FROM public.former_students');
  const countHeritage = await pgClient.query('SELECT count(*) FROM public.heritage');

  console.log('former_students:', countFormer.rows[0].count);
  console.log('heritage:', countHeritage.rows[0].count);
  console.log('legacy_builders:', countLegacy.rows[0].count);
  console.log('leaders:', countLeaders.rows);
  console.log('news_and_updates:', countNews.rows[0].count);
  console.log('gallery:', countGallery.rows[0].count);

  await pgClient.end();
  console.log('\n>>> ALL SUPABASE TABLES, STORAGE UPLOADS & DATA POPULATION COMPLETE! <<<');
}

main().catch(console.error);
