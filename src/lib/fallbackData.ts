import { HeritageItem, LegacyBuilder, Leader, NewsUpdate, GalleryItem } from '@/types/database';

export const FALLBACK_HERITAGE: HeritageItem[] = [
  {
    "id": 1,
    "name": "Memorial building built by Mr. P. Somasundaram Mudaliar.",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/heritage/ourpride_Mr.%20P.%20Somasundaram%20Mudaliar..png",
    "display_order": 1
  },
  {
    "id": 2,
    "name": "Raja Bahadur Memorial – Primary Block (1951)",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/heritage/ourpride_Raja%20Bahadur%20Memorial.png",
    "display_order": 2
  },
  {
    "id": 3,
    "name": "Mooshtiala Ramanna Memorial – Block (1928)",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/heritage/ourpride_Mooshtiala%20Ramanna%20Memorial%20%20Block.png",
    "display_order": 3
  },
  {
    "id": 4,
    "name": "P. Ramchandra Pillay Memorial – Block (1904)",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/heritage/ourpride_P.%20Ramchandra%20Pillay%20Memorial%20%20Block.png",
    "display_order": 4
  },
  {
    "id": 5,
    "name": "Dewan Bahadur C.V. Padma Rao Mudaliar Memorial 1934",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/heritage/ourpride_Dewan%20Bahadur%20C.V.%20Padma%20Rao%20Mudaliar.png",
    "display_order": 5
  },
  {
    "id": 6,
    "name": "C.V. Vardarajoo Mudaliar Memorial ground floor 1918 First floor 1959",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/heritage/ourpride_C.V.%20Vardarajoo%20Mudaliar%20Memorial.png",
    "display_order": 6
  },
  {
    "id": 7,
    "name": "Musthiala Ramanna Memorial 1922",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/heritage/ourpride_Musthiala%20Ramanna%20Memorial%201922.png",
    "display_order": 7
  },
  {
    "id": 8,
    "name": "Khan Saheb Mahomed Babu Khan Memorial 1928",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/heritage/ourpride_Khan%20Saheb%20Mahomed%20Babu%20Khan.png",
    "display_order": 8
  },
  {
    "id": 9,
    "name": "Madangopal Ojha Memorial (Science) 1942",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/heritage/ourpride_Madangopal%20Ojha%20Memorial.png",
    "display_order": 9
  },
  {
    "id": 10,
    "name": "P. Raja Bahadur Pillay Memorial (Primary) 1951",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/heritage/ourpride_P.%20Raja%20Bahadur%20Pillay%20Memorial.png",
    "display_order": 10
  },
  {
    "id": 11,
    "name": "Ammanbolu Nagavendra Rao Memorial (Library) 1951",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/heritage/ourpride_Ammanbolu%20Nagavendra%20Rao%20Memorial.png",
    "display_order": 11
  },
  {
    "id": 12,
    "name": "Multipurpose (Botany, Zoology and Commerce) Ground Floor 1956.",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/heritage/ourpride_Multipurpose.png",
    "display_order": 12
  }
];

export const FALLBACK_LEGACY_BUILDERS: LegacyBuilder[] = [
  {
    "id": 1,
    "name": "P. Somasundaram Mudaliar",
    "title": "Visionary Philanthropist",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/somasundaram_mudaliar.png",
    "display_order": 1
  },
  {
    "id": 2,
    "name": "Mir Mahbub Ali Khan",
    "title": "Sixth Nizam of Hyderabad",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/mir_mahbub_ali_khan.png",
    "display_order": 2
  },
  {
    "id": 3,
    "name": "H.E.H. Mir Osman Ali khan",
    "title": "Asaf Jah VI 1911 - 1948",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/mir_osman_ali_khan.png",
    "display_order": 3
  },
  {
    "id": 4,
    "name": "H.H. Mir Turab Ali Khan",
    "title": "Salar Jung 1",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/mir_turab_ali_khan.png",
    "display_order": 4
  },
  {
    "id": 5,
    "name": "Rai Saheb Chidura Durvasulu",
    "title": "Donor of Centenary Building - 1962",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/chidura_durvasulu.png",
    "display_order": 5
  },
  {
    "id": 6,
    "name": "R.S.M Venkatakistayya",
    "title": "Donor",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/rsm_venkatakistayya.png",
    "display_order": 6
  },
  {
    "id": 7,
    "name": "Khan Bahadur A.K. Babu Khan",
    "title": "Committee Member and Donor",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/ak_babu_khan.png",
    "display_order": 7
  },
  {
    "id": 8,
    "name": "S. Elliah",
    "title": "Donor",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/s_elliah.png",
    "display_order": 8
  },
  {
    "id": 9,
    "name": "A. Nagavendra Rao",
    "title": "Donor",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/a_nagavendra_rao.png",
    "display_order": 9
  },
  {
    "id": 10,
    "name": "Rao Saheb C.K. Durvasula",
    "title": "Donor",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/ck_durvasula.png",
    "display_order": 10
  },
  {
    "id": 11,
    "name": "P. Rajabahadur Pillay",
    "title": "Donor",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/p_rajabahadur_pillay.png",
    "display_order": 11
  },
  {
    "id": 12,
    "name": "Rao Saheb Burgu Mahadev",
    "title": "Donor",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/burgu_mahadev.png",
    "display_order": 12
  },
  {
    "id": 13,
    "name": "Nadirshaw B. Chenoy",
    "title": "Donor",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/nadirshaw_b_chenoy.png",
    "display_order": 13
  },
  {
    "id": 14,
    "name": "A. Srinivasa Mudaliar",
    "title": "Donor",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/a_srinivasa_mudaliar.png",
    "display_order": 14
  },
  {
    "id": 15,
    "name": "Rai Kanti Hanumaiah Gupta",
    "title": "Donor",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/legacy/kanti_hanumaiah_gupta.png",
    "display_order": 15
  }
];

export const FALLBACK_HEADMASTERS: Leader[] = [
  {
    "id": 1,
    "name": "Singaravelu Mudaliar",
    "title": "1875",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/singaravelu_mudaliar.png",
    "display_order": 1
  },
  {
    "id": 2,
    "name": "S.M. Kelly",
    "title": "1882 - 1883",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/sm_kelly.png",
    "display_order": 2
  },
  {
    "id": 3,
    "name": "J. Zaccheus",
    "title": "1891 - 1899",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/j_zaccheus.png",
    "display_order": 3
  },
  {
    "id": 4,
    "name": "D.B.R. Venkataratnam Naidu",
    "title": "1889–1894",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/dbr_venkataratnam_naidu.png",
    "display_order": 4
  },
  {
    "id": 5,
    "name": "V. Ramanujam Pillay",
    "title": "1905 - 1907",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/v_ramanujam_pillay.png",
    "display_order": 5
  },
  {
    "id": 6,
    "name": "T.K Bappu",
    "title": "1907 - 1910",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/tk_bappu.png",
    "display_order": 6
  },
  {
    "id": 7,
    "name": "S. Alagappa Mudaliar",
    "title": "1911 - 1915",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/s_alagappa_mudaliar.png",
    "display_order": 7
  },
  {
    "id": 8,
    "name": "M. Hanumanth Naidu",
    "title": "1919 - 1943",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/m_hanumanth_naidu.png",
    "display_order": 8
  },
  {
    "id": 9,
    "name": "M. S. Kotiswaran",
    "title": "1943 - 1960",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/ms_kotiswaran.png",
    "display_order": 9
  },
  {
    "id": 10,
    "name": "E. Veeraswamy",
    "title": "1960 - 1974",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/e_veeraswamy.png",
    "display_order": 10
  },
  {
    "id": 11,
    "name": "C. Venkat Rao",
    "title": "1974 - 1983",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/c_venkat_rao.png",
    "display_order": 11
  },
  {
    "id": 12,
    "name": "G. Krishna Rao",
    "title": "1983 - 1990",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/g_krishna_rao.png",
    "display_order": 12
  },
  {
    "id": 13,
    "name": "G. Bhojaraj",
    "title": "1990 - 1992",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/g_bhojaraj.png",
    "display_order": 13
  },
  {
    "id": 14,
    "name": "K. Rama Rao",
    "title": "1992 - 1996",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/k_rama_rao.png",
    "display_order": 14
  },
  {
    "id": 15,
    "name": "K.V. Chenna Chary",
    "title": "1996 - 1999",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/kv_chenna_chary.png",
    "display_order": 15
  },
  {
    "id": 16,
    "name": "M. Babu Rao",
    "title": "1999 - 2002",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/m_babu_rao.png",
    "display_order": 16
  },
  {
    "id": 17,
    "name": "V.B. Usha Devi",
    "title": "2002 - 2003",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/vb_usha_devi.png",
    "display_order": 17
  },
  {
    "id": 18,
    "name": "B. Karunamayi",
    "title": "2003 - 2005",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/b_karunamayi.png",
    "display_order": 18
  },
  {
    "id": 19,
    "name": "S.A. Prema Kumari",
    "title": "2005 - 2006",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/sa_prema_kumari.png",
    "display_order": 19
  },
  {
    "id": 20,
    "name": "K.J. Venkateshwar Rao",
    "title": "2006 - 2024",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/kj_venkateshwar_rao.png",
    "display_order": 20
  },
  {
    "id": 21,
    "name": "C. YADAGIRI",
    "title": "2024 - 2026",
    "category": "headmaster",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/leaders/c_yadagiri.png",
    "display_order": 21
  }
];

export const FALLBACK_COMMITTEE: Leader[] = [
  {
    "id": 22,
    "name": "DEWAN BHADUR C.V. PADMA RAO MUDALIAR",
    "title": "Honorary Secretary 1918-1933 | President 1933-34",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/cv_padma_rao_mudaliar.png",
    "display_order": 1
  },
  {
    "id": 23,
    "name": "Mr. ANNASWAMY MUDALIAR",
    "title": "Honorary Secretary, 1878-1880",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/annaswamy_mudaliar.png",
    "display_order": 2
  },
  {
    "id": 24,
    "name": "M. C.C. PAUL",
    "title": "President 1935-1938 & 1939-1940",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/m_cc_paul.png",
    "display_order": 3
  },
  {
    "id": 25,
    "name": "Mr. M. NARAYANSWAMY MUDALIAR",
    "title": "Honorary Secretary, 1881-1884",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/m_narayanswamy_mudaliar.png",
    "display_order": 4
  },
  {
    "id": 26,
    "name": "Mr. A. VENUGOPAL PILLAY",
    "title": "Honorary Secretary, 1884-1885",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/a_venugopal_pillay.png",
    "display_order": 5
  },
  {
    "id": 27,
    "name": "Mr. P. RAMACHANDRA PILLAY",
    "title": "Honorary Secretary, 1885-1902",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/p_ramachandra_pillay.png",
    "display_order": 6
  },
  {
    "id": 28,
    "name": "C. VARDARAJOO MUDALIAR",
    "title": "Honorary Secretary, 1902-1916",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/c_vardarajoo_mudaliar.png",
    "display_order": 7
  },
  {
    "id": 29,
    "name": "Mr. A.V. PATTABIRAM",
    "title": "Honorary Secretary and Donor 1942-1948",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/av_pattabiram.png",
    "display_order": 8
  },
  {
    "id": 30,
    "name": "L. GANGADHARAM",
    "title": "Honorary Joint Secretary 1962-1965",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/l_gangadharam.png",
    "display_order": 9
  },
  {
    "id": 31,
    "name": "KHAN BAHADUR ABDUL KARIM BABU KHAN",
    "title": "Committee Member and Donor",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/abdul_karim_babu_khan.png",
    "display_order": 10
  },
  {
    "id": 32,
    "name": "A. RAMASWAMY IYENGAR",
    "title": "Committee Member",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/a_ramaswamy_iyengar.png",
    "display_order": 11
  },
  {
    "id": 33,
    "name": "Z.R. RANJI",
    "title": "Committee Member",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/zr_ranji.png",
    "display_order": 12
  },
  {
    "id": 34,
    "name": "Mr. M. RAJENDRA NAIDU",
    "title": "Committee Member",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/m_rajendra_naidu.png",
    "display_order": 13
  },
  {
    "id": 35,
    "name": "Mr. P. MASILAMANI",
    "title": "Committee Member",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/p_masilamani.png",
    "display_order": 14
  },
  {
    "id": 36,
    "name": "RAO BAHADUR A.J. VEERASWAMY",
    "title": "Committee Member",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/aj_veeraswamy.png",
    "display_order": 15
  },
  {
    "id": 37,
    "name": "Mr. N.S. RAGHAVAN",
    "title": "Committee Member",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/ns_raghavan.png",
    "display_order": 16
  },
  {
    "id": 38,
    "name": "MAJOR N.K. GURUSWAMY, I.A.S",
    "title": "Committee Member",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/nk_guruswamy.png",
    "display_order": 17
  },
  {
    "id": 39,
    "name": "Mr. C.S. KRISHNASWAMY MUDALIAR",
    "title": "Committee Member",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/cs_krishnaswamy_mudaliar.png",
    "display_order": 18
  },
  {
    "id": 40,
    "name": "Mr. K.T. NARASIMHACHAR",
    "title": "Committee Member",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/kt_narasimhachar.png",
    "display_order": 19
  },
  {
    "id": 41,
    "name": "Mr. C.V.K. SRINIVASULU",
    "title": "Committee Member",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/cvk_srinivasulu.png",
    "display_order": 20
  },
  {
    "id": 42,
    "name": "Dewan Bhadur A. Venugopal",
    "title": "Honorary Secretary 1938 - 1942",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/dewan_bhadur_a_venugopal.png",
    "display_order": 21
  },
  {
    "id": 43,
    "name": "A.H Venkat rao",
    "title": "Honorary Secretary 1948 - 1955",
    "category": "committee",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/committee/ah_venkat_rao.png",
    "display_order": 22
  }
];

export const FALLBACK_NEWS: NewsUpdate[] = [
  {
    "id": 1,
    "title": "MahbubCollege to commemorate 150 years with Vivekananda Ratha-Yatra",
    "secondary_text": "Celebration & Commemoration",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/news/commemorate_150_years.png",
    "external_link": "https://www.deccanchronicle.com/southern-states/telangana/mahbub-college-complains-to-governor-against-jntuh-1884289",
    "display_order": 1
  },
  {
    "id": 2,
    "title": "MahbubCollege has an illustrious past. From giving the nation pioneers and stalwarts",
    "secondary_text": "Institutional Heritage",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/news/illustrious_past.png",
    "external_link": null,
    "display_order": 2
  },
  {
    "id": 3,
    "title": "Alumni are planning to make representations to concerned authorities in the government...",
    "secondary_text": "Alumni Action",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/news/alumni_representations.png",
    "external_link": null,
    "display_order": 3
  },
  {
    "id": 4,
    "title": "Mahbub College Complains To Governor Against JNTUH",
    "secondary_text": "Governance & Media",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/news/complaint_governor.png",
    "external_link": null,
    "display_order": 4
  },
  {
    "id": 5,
    "title": "Mahbub Education Institution gets Telangana High Court protection",
    "secondary_text": "High Court Injunction",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/news/high_court_protection.png",
    "external_link": null,
    "display_order": 5
  },
  {
    "id": 6,
    "title": "Tussle over Mahbub College: High Court passes injunction order",
    "secondary_text": "Legal Victory",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/news/court_injunction_order.png",
    "external_link": null,
    "display_order": 6
  },
  {
    "id": 7,
    "title": "Alumni association of Mahbub College conducted an emergency meeting on Monday to discuss...",
    "secondary_text": "Emergency Alumni Assembly",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/news/emergency_meeting.png",
    "external_link": null,
    "display_order": 7
  },
  {
    "id": 8,
    "title": "Alumni appeal to state government to protect historic campus and assets",
    "secondary_text": "Campus Preservation",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/news/campus_protection_appeal.png",
    "external_link": null,
    "display_order": 8
  }
];

export const FALLBACK_GALLERY: GalleryItem[] = [
  {
    "id": 1,
    "name": "All India Boys Scout Conference 1920 - 1921",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/gallery/boys_scout_conference_1920.png",
    "display_order": 1
  },
  {
    "id": 2,
    "name": "Scouts & Guides with the British Unit Officer - 1930",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/gallery/scouts_guides_british_officer_1930.png",
    "display_order": 2
  },
  {
    "id": 3,
    "name": "Scouts & Clubs of MCHS - 1930",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/gallery/scouts_clubs_mchs_1930.png",
    "display_order": 3
  },
  {
    "id": 4,
    "name": "Boxing 1942",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/gallery/boxing_1942.png",
    "display_order": 4
  },
  {
    "id": 5,
    "name": "Hokey Batch 1942 - 1943",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/gallery/hockey_batch_1942.png",
    "display_order": 5
  },
  {
    "id": 6,
    "name": "Tennikoit Match 1942 - 1943",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/gallery/tennikoit_match_1942.png",
    "display_order": 6
  },
  {
    "id": 7,
    "name": "Tennikoit Match 1942 - 1943",
    "photo_url": "https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/gallery/tennikoit_match_1942.png",
    "display_order": 7
  }
];
