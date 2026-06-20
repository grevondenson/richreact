// Removed unused imports: React, useState, useMemo, useNavigate
import './PapersLanding.css';


// Chemistry Board Data
const apChemPapers = [
  {
    year: "2023",
    papers: [
      { label: "June 2023 Section II: Free Response", qpUrl: "", msUrl: "", board: "AP" }
    ]
  },
  {
    year: "2022",
    papers: [
      { label: "June 2022 Section II: Free Response", qpUrl: "", msUrl: "", board: "AP" }
    ]
  },
  {
    year: "2021",
    papers: [
      { label: "June 2021 Section II: Free Response", qpUrl: "", msUrl: "", board: "AP" }
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "June 2019 Section II: Free Response", qpUrl: "", msUrl: "", board: "AP" }
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "June 2018 Section II: Free Response", qpUrl: "", msUrl: "", board: "AP" }
    ]
  },
  {
    year: "2017",
    papers: [
      { label: "June 2017 Section II: Free Response", qpUrl: "", msUrl: "", board: "AP" }
    ]
  },
  {
    year: "2016",
    papers: [
      { label: "June 2016 Section II: Free Response", qpUrl: "", msUrl: "", board: "AP" }
    ]
  },
  {
    year: "2015",
    papers: [
      { label: "June 2015 Section II: Free Response", qpUrl: "", msUrl: "", board: "AP" }
    ]
  },
  {
    year: "2014",
    papers: [
      { label: "June 2014 Section II: Free Response", qpUrl: "", msUrl: "", board: "AP" }
    ]
  }
];

const aqaAsChemPapers = [
  {
    year: "2023",
    papers: [
      { label: "June 2023 Paper 1: Inorganic and Physical Chemistry 7404/1", qpUrl: "https://drive.google.com/drive/u/3/folders/1KaiUcWCdtRcpYQmPxqvOizv_E1yQ3pUw?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1TsaoDG7RTl2nhvKzMbBiYSauP9OEKNqP/view?usp=drive_link", board: "AQA AS" },
      { label: "June 2023 Paper 2: Organic and Physical Chemistry 7404/2", qpUrl: "https://drive.google.com/file/d/1XNFjtEmsiPTuBF0SluwIR3V45r_d11FI/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1rc0-sJB5sei4TG6JyzjbSEv9b3TFaaPj/view?usp=drive_link", board: "AQA AS" }
    ]
  },
  {
    year: "2022",
    papers: [
      { label: "June 2022 Paper 1: Inorganic and Physical Chemistry 7404/1", qpUrl: "https://drive.google.com/drive/u/3/folders/1KaiUcWCdtRcpYQmPxqvOizv_E1yQ3pUw?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1Em5nXEkhiQONTXo9KnD42QES7WB6-Rrq/view?usp=drive_link", board: "AQA AS" },
      { label: "June 2022 Paper 2: Organic and Physical Chemistry 7404/2", qpUrl: "https://drive.google.com/file/d/1tCjx_uto27eLCEt3PPXHkV_TWVUwpPdB/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1Wxsz-PdFmTEcsD5GxZxvfiM4nzcdA_sE/view?usp=drive_link", board: "AQA AS" }
    ]
  },
  {
    year: "2021",
    papers: [
      { label: "November 2021 Paper 1: Inorganic and Physical Chemistry 7404/1", qpUrl: "https://drive.google.com/drive/u/3/folders/1KaiUcWCdtRcpYQmPxqvOizv_E1yQ3pUw?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1YbJR1zAus455EE_2Xoc-PrdwX3bC4jD_/view?usp=drive_link", board: "AQA AS" },
      { label: "November 2021 Paper 2: Organic and Physical Chemistry 7404/2", qpUrl: "https://drive.google.com/file/d/1QJYMhQfu4CD7WeEuzHsqp5MQBv4OkhIH/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1QU_T3SZWAWYcakJXkj-6oU99EmZi-qPa/view?usp=drive_link", board: "AQA AS" }
    ]
  },
  {
    year: "2020",
    papers: [
      { label: "June 2020 Paper 1: Inorganic and Physical Chemistry 7404/1", qpUrl: "https://drive.google.com/drive/u/3/folders/1KaiUcWCdtRcpYQmPxqvOizv_E1yQ3pUw?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1OiByoNHZuGtPVDamNQsFxJe_gRyl8ELw/view?usp=drive_link", board: "AQA AS" },
      { label: "June 2020 Paper 2: Organic and Physical Chemistry 7404/2", qpUrl: "https://drive.google.com/file/d/1jaVyNX_eGFLFW9-pep8LBHTX429DdMuk/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/15uN0dtZIrmQzQ0ZXBuAN5ZM0C5Q21cIl/view?usp=drive_link", board: "AQA AS" }
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "June 2019 Paper 1: Inorganic and Physical Chemistry 7404/1", qpUrl: "https://drive.google.com/drive/u/3/folders/1KaiUcWCdtRcpYQmPxqvOizv_E1yQ3pUw?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1MgP7-BnsotzaVPaHnfkCjlRkD_PQ7Mfn/view?usp=drive_link", board: "AQA AS" },
      { label: "June 2019 Paper 2: Organic and Physical Chemistry 7404/2", qpUrl: "https://drive.google.com/file/d/1aEg3HwGexaw9uwz9ae8TAAnF_XiSW6PG/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1IcWtcnhxF-552GQT3hxQlY4ViawkUPXz/view?usp=drive_link", board: "AQA AS" }
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "June 2018 Paper 1: Inorganic and Physical Chemistry 7404/1", qpUrl: "https://drive.google.com/drive/u/3/folders/1KaiUcWCdtRcpYQmPxqvOizv_E1yQ3pUw?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/12KVBLpi3KUr1DVDce_TCFTt7awZ5ev8l/view?usp=drive_link", board: "AQA AS" },
      { label: "June 2018 Paper 2: Organic and Physical Chemistry 7404/2", qpUrl: "https://drive.google.com/file/d/1GfasGfwlTA7ONjxEYtoB4tuMJwm0vyyY/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1ho2evd6d3SUnGIj364yGwVwaeVPkFQOq/view?usp=drive_link", board: "AQA AS" }
    ]
  },
  {
    year: "2017",
    papers: [
      { label: "June 2017 Paper 1: Inorganic and Physical Chemistry 7404/1", qpUrl: "https://drive.google.com/drive/u/3/folders/1KaiUcWCdtRcpYQmPxqvOizv_E1yQ3pUw?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/10wQK6T-ExQ1HbIWhcAIeiPYQdxJmAhFE/view?usp=drive_link", board: "AQA AS" },
      { label: "June 2017 Paper 2: Organic and Physical Chemistry 7404/2", qpUrl: "https://drive.google.com/file/d/1HjmALKHfAeS-GSdMq2q3ns-K23ypZvp9/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1RxDf0YSig_YBxOl8Bb5XEGdr7gPyImCt/view?usp=drive_link", board: "AQA AS" }
    ]
  },
  {
    year: "2016",
    papers: [
      { label: "June 2016 Paper 1: Inorganic and Physical Chemistry 7404/1", qpUrl: "https://drive.google.com/drive/u/3/folders/1KaiUcWCdtRcpYQmPxqvOizv_E1yQ3pUw?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1zo1wA_yx0-9WK8hcJu1WP21TDwFhed9h/view?usp=drive_link", board: "AQA AS" },
      { label: "June 2016 Paper 2: Organic and Physical Chemistry 7404/2", qpUrl: "https://drive.google.com/drive/u/3/folders/1KaiUcWCdtRcpYQmPxqvOizv_E1yQ3pUw?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1wcxl8YAOBz5vKPvw88ziKZ6FJRwUkmlo/view?usp=drive_link", board: "AQA AS" }
    ]
  }
];

const cieAsChemPapers = [
   {
    year:"2025",
    papers: [
      { label: "June 2025 Paper 1,2,3,4,5: 9701/...", qpUrl: "https://drive.google.com/drive/folders/13RYsOt8UhL9vAj_ym25vGgoGG4-lUXqh?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1kLgjrgAueil_k7mDztCaM3t0EDNMNy-U?usp=drive_link", board: "CIE A Level" },
    ]
  },
  {
    year:"2024",
    papers: [
      { label: "June 2024 Paper 1,2,3,4,5: 9701/...", qpUrl: "https://drive.google.com/drive/folders/1mWrqQByJY8dc1nAQ-GhAQfVA3StWSsFP?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1VuHLtNvKE-VUF_B1bKdF74VF2_Qoz__F?usp=drive_link", board: "CIE A Level" },
    ]
  },
  {
    year:"2023",
    papers: [
      { label: "June 2023 Paper 1,2,3,4,5: 9701/...", qpUrl: "https://drive.google.com/drive/folders/1KN40LpGbpH8d1_uD7FfnXdzBQIQKnpbF?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1QC5sK5bSx58o6XGYWPidIaxvKMYFxE4a?usp=drive_link", board: "CIE A Level" },
    ]
  },
  {
    year: "2022",
    papers: [
      { label: "February, June 2022 Paper 1,2,3:  9701/...", qpUrl: "https://drive.google.com/drive/folders/1iiMbmvTsWbCB18ZO8SrDoJ4oUOnvaZ1J?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/19EloNA9T3-S1g2W9wl6KSYFDj0BOGK0i?usp=drive_link", board: "CIE AS" },
     
    ]
  },
  {
    year: "2021",
    papers: [
      { label: "March, June, October 2021 Paper 1,2,3:  9701/...", qpUrl: "https://drive.google.com/drive/folders/1zRcs-FA5uQEbJx8XLnMLOyphhPitKpGW?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1s4DJTxUd0nblmFBvo2fJJVoayOHSCjqD?usp=drive_link", board: "CIE AS" },
      
    ]
  },
  {
    year: "2020",
    papers: [
      { label: "March, October 2020 Paper 1,2,3: 9701/...", qpUrl: "https://drive.google.com/drive/folders/19L9h5aEHDdUTkoqO3kLUopgMBC56U3CL?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1kusVeGaUGp3q-PXP3Jbk5Uy3xMqu8LeO?usp=drive_link", board: "CIE AS" },
     
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "March, June, October 2019 Paper 1,2,3: 9701/...", qpUrl: "https://drive.google.com/drive/folders/13STVMJx4MG2lUM3p_rrRKJgA7Ic5iXl7?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1MiYsl4BCQvAgON8pz4iXsLuI5AAzALcE?usp=drive_link", board: "CIE AS" },
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "March, June, October 2018 Paper 1,2,3: 9701/...", qpUrl: "https://drive.google.com/drive/folders/1VU2HeG_uG5--2_qH0Y3-UQdAbHb48NJy?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/16qc3VyAoatZxwXC_iPCC7Jo-d3GIwopI?usp=drive_link", board: "CIE AS" },
    ]
  }
];

const edexcelAsChemPapers = [
  {
    year: "2023",
    papers: [
      { label: "June 2023 Paper 1: Core Inorganic and Physical Chemistry 8CH0/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1udCDLIALwgJ3at-gwwDF4SksdEN6sSsR?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/11XWeSKoWgQxN7pd7SFb_U0k2v_WB-Fx0/view?usp=drive_link", board: "Edexcel AS" },
      { label: "June 2023 Paper 2: Core Organic and Physical Chemistry 8CH0/02", qpUrl: "https://drive.google.com/drive/u/3/folders/1udCDLIALwgJ3at-gwwDF4SksdEN6sSsR?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1AilOXsBMADY63oCew4VcDplrH-Cku1jM/view?usp=drive_link", board: "Edexcel AS" }
    ]
  },
  {
    year: "2022",
    papers: [
      { label: "June 2022 Paper 1: Core Inorganic and Physical Chemistry 8CH0/01", qpUrl: "https://drive.google.com/file/d/1rZM7ZULcnwBWpm-vwZno5vGUwWQdtyXF/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1ly0dpOvX3SgJfIET6G86VZsqumd0dGBV/view?usp=drive_link", board: "Edexcel AS" },
      { label: "June 2022 Paper 2: Core Organic and Physical Chemistry 8CH0/02", qpUrl: "https://drive.google.com/file/d/133cBnptmJXE05wllsIpfZfqb9OJ1QoWz/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1Ha1Y2eiSpedgmO2gAdvPj0CqKca7Dj2l/view?usp=drive_link", board: "Edexcel AS" }
    ]
  },
  {
    year: "2021",
    papers: [
      { label: "November 2021 Paper 1: Core Inorganic and Physical Chemistry 8CH0/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1udCDLIALwgJ3at-gwwDF4SksdEN6sSsR?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/13_nxXeK5DZ9Kkp5thosPNWvkz_-ropwt/view?usp=drive_link", board: "Edexcel AS" },
      { label: "November 2021 Paper 2: Core Organic and Physical Chemistry 8CH0/02", qpUrl: "https://drive.google.com/file/d/1d0vTT8tj_wvpRyN9XR7nud2InPjIWud3/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1Iy-pSHnf3dWJ4IKvHLlJ0QSbRv4AL-OD/view?usp=drive_link", board: "Edexcel AS" }
    ]
  },
  {
    year: "2020",
    papers: [
      { label: "June 2020 Paper 1: Core Inorganic and Physical Chemistry 8CH0/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1udCDLIALwgJ3at-gwwDF4SksdEN6sSsR?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aINcGy5GyXmH4h4OLOt9iyL-eboEb4gd?dmr=1&ec=wgc-drive-hero-goto", board: "Edexcel AS" },
      { label: "June 2020 Paper 2: Core Organic and Physical Chemistry 8CH0/02", qpUrl: "https://drive.google.com/drive/u/3/folders/1udCDLIALwgJ3at-gwwDF4SksdEN6sSsR?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1GcJ4rH5BQKCFx09aTZVMQP7a3xHS855Y/view?usp=drive_link", board: "Edexcel AS" }
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "June 2019 Paper 1: Core Inorganic and Physical Chemistry 8CH0/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1udCDLIALwgJ3at-gwwDF4SksdEN6sSsR?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aINcGy5GyXmH4h4OLOt9iyL-eboEb4gd?dmr=1&ec=wgc-drive-hero-goto", board: "Edexcel AS" },
      { label: "June 2019 Paper 2: Core Organic and Physical Chemistry 8CH0/02", qpUrl: "https://drive.google.com/drive/u/3/folders/1udCDLIALwgJ3at-gwwDF4SksdEN6sSsR?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aINcGy5GyXmH4h4OLOt9iyL-eboEb4gd?dmr=1&ec=wgc-drive-hero-goto", board: "Edexcel AS" }
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "June 2018 Paper 1: Core Inorganic and Physical Chemistry 8CH0/01", qpUrl: "https://drive.google.com/file/d/1LOFWubOtkSZrKDQIKhf6yOAQIWNlCLbG/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1E86GtBEd4qoIYzANamwaAJKZGa1u4Ru9/view?usp=drive_link", board: "Edexcel AS" },
      { label: "June 2018 Paper 2: Core Organic and Physical Chemistry 8CH0/02", qpUrl: "https://drive.google.com/file/d/1qL1HaoZiqnxV2SZ2XfIhpS_gFEWdeKoJ/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1TqOlD_WBQ8EOT_eqfbxu7XRUd3AdUTa6/view?usp=drive_link", board: "Edexcel AS" }
    ]
  },
  {
    year: "2017",
    papers: [
      { label: "June 2017 Paper 1: Core Inorganic and Physical Chemistry 8CH0/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1udCDLIALwgJ3at-gwwDF4SksdEN6sSsR?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1SAlfYSjT2WH8HyoUA6UDywwRB9jx8wTo/view?usp=drive_link", board: "Edexcel AS" },
      { label: "June 2017 Paper 2: Core Organic and Physical Chemistry 8CH0/02", qpUrl: "https://drive.google.com/file/d/1F3Xf3zQpOu1-Aux9eKbnBjqKc6Ck9D0Y/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/11f2Jile3tlq1H1c-gHxW0k7BpFOUi6zN/view?usp=drive_link", board: "Edexcel AS" }
    ]
  },
  {
    year: "2016",
    papers: [
      { label: "June 2016 Paper 1: Core Inorganic and Physical Chemistry 8CH0/01", qpUrl: "https://drive.google.com/file/d/1v_HX7x9Q62E43HOzpkiISh4kjcfTUAIA/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1j44VC2ycIfSznbHVyYA-JIOacX7UIFi-/view?usp=drive_link", board: "Edexcel AS" },
      { label: "June 2016 Paper 2: Core Organic and Physical Chemistry 8CH0/02", qpUrl: "https://drive.google.com/file/d/17XDbhWsYmgSOLDJyoO_dsi0ilfyecCpp/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1ooWg0saQO14u_f4mzr9Z5dvKBr2Tgbsk/view?usp=drive_link", board: "Edexcel AS" }
    ]
  }
];

const ocrAsChemPapers = [
  {
    year: "Specimen",
    papers: [
      { label: "Paper 1: Breadth in Chemistry H032/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1d58zUahrlanaAw9-L0K19q106LFgDkZq/view?usp=drive_link", board: "OCR AS Chemistry A" },
      { label: "Paper 2: Depth in Chemistry H032/02", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/10qywahVHqA2YSyDMxG0w3Cb_Mt4xF5J_/view?usp=drive_link", board: "OCR AS Chemistry A" }
    ]
  },
  {
    year: "2023",
    papers: [
      { label: "June 2023 Paper 1: Breadth in Chemistry H032/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aqXbrRwOfBzvDITWNi62JpZx_BxRiTN9?dmr=1&ec=wgc-drive-hero-goto", board: "OCR AS Chemistry A" },
      { label: "June 2023 Paper 2: Depth in Chemistry H032/02", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aqXbrRwOfBzvDITWNi62JpZx_BxRiTN9?dmr=1&ec=wgc-drive-hero-goto", board: "OCR AS Chemistry A" }
    ]
  },
  {
    year: "2022",
    papers: [
      { label: "June 2022 Paper 1: Breadth in Chemistry H032/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aqXbrRwOfBzvDITWNi62JpZx_BxRiTN9?dmr=1&ec=wgc-drive-hero-goto", board: "OCR AS Chemistry A" },
      { label: "June 2022 Paper 2: Depth in Chemistry H032/02", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aqXbrRwOfBzvDITWNi62JpZx_BxRiTN9?dmr=1&ec=wgc-drive-hero-goto", board: "OCR AS Chemistry A" }
    ]
  },
  {
    year: "2021",
    papers: [
      { label: "October 2021 Paper 1: Breadth in Chemistry H032/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aqXbrRwOfBzvDITWNi62JpZx_BxRiTN9?dmr=1&ec=wgc-drive-hero-goto", board: "OCR AS Chemistry A" },
      { label: "October 2021 Paper 2: Depth in Chemistry H032/02", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aqXbrRwOfBzvDITWNi62JpZx_BxRiTN9?dmr=1&ec=wgc-drive-hero-goto", board: "OCR AS Chemistry A" }
    ]
  },
  {
    year: "2020",
    papers: [
      { label: "October 2020 Paper 1: Breadth in Chemistry H032/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aqXbrRwOfBzvDITWNi62JpZx_BxRiTN9?dmr=1&ec=wgc-drive-hero-goto", board: "OCR AS Chemistry A" },
      { label: "October 2020 Paper 2: Depth in Chemistry H032/02", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aqXbrRwOfBzvDITWNi62JpZx_BxRiTN9?dmr=1&ec=wgc-drive-hero-goto", board: "OCR AS Chemistry A" }
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "June 2019 Paper 1: Breadth in Chemistry H032/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aqXbrRwOfBzvDITWNi62JpZx_BxRiTN9?dmr=1&ec=wgc-drive-hero-goto", board: "OCR AS Chemistry A" },
      { label: "June 2019 Paper 2: Depth in Chemistry H032/02", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1aqXbrRwOfBzvDITWNi62JpZx_BxRiTN9?dmr=1&ec=wgc-drive-hero-goto", board: "OCR AS Chemistry A" }
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "June 2018 Paper 1: Breadth in Chemistry H032/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1n7Ezjyhm4gsK5-cd1QubsXonWLoPG7je/view?usp=drive_link", board: "OCR AS Chemistry A" },
      { label: "June 2018 Paper 2: Depth in Chemistry H032/02", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/123T2yPMh80EjSKGpSzmtuHNn_1S1zHXZ/view?usp=drive_link", board: "OCR AS Chemistry A" }
    ]
  },
  {
    year: "2017",
    papers: [
      { label: "June 2017 Paper 1: Breadth in Chemistry H032/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1MG1jL73FVWR95V84oxhTyj31W27PvUkO/view?usp=drive_link", board: "OCR AS Chemistry A" },
      { label: "June 2017 Paper 2: Depth in Chemistry H032/02", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/18dQbCq8wHWO-gpBvEMdTWBesuiJhwNmd/view?usp=drive_link", board: "OCR AS Chemistry A" }
    ]
  },
  {
    year: "2016",
    papers: [
      { label: "June 2016 Paper 1: Breadth in Chemistry H032/01", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/19jLdMAB4oRlKOOLOoRP6ysEfE4W7CzYb/view?usp=drive_link", board: "OCR AS Chemistry A" },
      { label: "June 2016 Paper 2: Depth in Chemistry H032/02", qpUrl: "https://drive.google.com/drive/u/3/folders/1xYDqxnPq_TIj8sH-EaL1qYGzH976WDXv?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1j8VJz99SwzArqWYm0mINJztQpBuz0exW/view?usp=drive_link", board: "OCR AS Chemistry A" }
    ]
  }
];

const wjecAsChemPapers = [
  {
    year: "2022",
    papers: [
      { label: "June 2022 Unit 1: The Language of Chemistry, Structure of Matter and Simple Reactions 2410U10-1", qpUrl: "https://drive.google.com/drive/u/3/folders/1gkiVf12qeXlLIZ_Bh8dlVquP9yxqr5nf?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/17M3ADtl6u42cS3fDSbCYTgBp5mQZY9Dd/view?usp=drive_link", board: "WJEC AS" },
      { label: "June 2022 Unit 2: Energy, Rate and Chemistry of Carbon Compounds 2410U20-1", qpUrl: "https://drive.google.com/drive/u/3/folders/1gkiVf12qeXlLIZ_Bh8dlVquP9yxqr5nf?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1CrN_dOQoGGBJAC5A-JqBiAJrilFoRWcZ/view?usp=drive_link", board: "WJEC AS" }
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "June 2019 Unit 1: The Language of Chemistry, Structure of Matter and Simple Reactions 2410U10-1", qpUrl: "https://drive.google.com/drive/u/3/folders/1gkiVf12qeXlLIZ_Bh8dlVquP9yxqr5nf?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/126WhMvYVYpAWASnK-SsEIhxfuaZVoc5E/view?usp=drive_link", board: "WJEC AS" },
      { label: "June 2019 Unit 2: Energy, Rate and Chemistry of Carbon Compounds 2410U20-1", qpUrl: "https://drive.google.com/drive/u/3/folders/1gkiVf12qeXlLIZ_Bh8dlVquP9yxqr5nf?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/19-pmxlo-LvVOHSRRBYKftbY5u1mp5DLq/view?usp=drive_link", board: "WJEC AS" }
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "June 2018 Unit 1: The Language of Chemistry, Structure of Matter and Simple Reactions 2410U10-1", qpUrl: "https://drive.google.com/drive/u/3/folders/1gkiVf12qeXlLIZ_Bh8dlVquP9yxqr5nf?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1b-4kxWxjpecAtneiJu-ZG62KJLmmtpym/view?usp=drive_link", board: "WJEC AS" },
      { label: "June 2018 Unit 2: Energy, Rate and Chemistry of Carbon Compounds 2410U20-1", qpUrl: "https://drive.google.com/drive/u/3/folders/1gkiVf12qeXlLIZ_Bh8dlVquP9yxqr5nf?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/15fJLuiReYb3Oy5x1AwbfjQE4En11MBUd/view?usp=drive_link", board: "WJEC AS" }
    ]
  },
  {
    year: "2017",
    papers: [
      { label: "June 2017 Unit 1: The Language of Chemistry, Structure of Matter and Simple Reactions 2410U10-1", qpUrl: "https://drive.google.com/drive/u/3/folders/1gkiVf12qeXlLIZ_Bh8dlVquP9yxqr5nf?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1QzfZhTum5Au0tjmG4D93hCC6yQuJhctJ/view?usp=drive_link", board: "WJEC AS" },
      { label: "June 2017 Unit 2: Energy, Rate and Chemistry of Carbon Compounds 2410U20-1", qpUrl: "https://drive.google.com/drive/u/3/folders/1gkiVf12qeXlLIZ_Bh8dlVquP9yxqr5nf?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1_TI50mqxCozo4S68SO0DoXa15n48TEB5/view?usp=drive_link", board: "WJEC AS" }
    ]
  },
  {
    year: "2016",
    papers: [
      { label: "June 2016 Unit 1: The Language of Chemistry, Structure of Matter and Simple Reactions 2410U10-1", qpUrl: "https://drive.google.com/drive/u/3/folders/1gkiVf12qeXlLIZ_Bh8dlVquP9yxqr5nf?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1tSK7LjsjeFSoFW9lOVyK7z3IEpxqhBiB?dmr=1&ec=wgc-drive-hero-goto", board: "WJEC AS" },
      { label: "June 2016 Unit 2: Energy, Rate and Chemistry of Carbon Compounds 2410U20-1", qpUrl: "https://drive.google.com/drive/u/3/folders/1gkiVf12qeXlLIZ_Bh8dlVquP9yxqr5nf?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/10qF6dFo6vmwzPa6DbZGvv5N9ncQW3MCY/view?usp=drive_link", board: "WJEC AS" }
    ]
  }
];

const aqaALevelChemPapers = [
  {
    year: "2023",
    papers: [
      { label: "June 2023 Paper 1: Inorganic and Physical Chemistry 7405/1", qpUrl: "https://drive.google.com/file/d/1FWm-1X4QmExhs0zWxMMjRa_CaAGicB3X/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1qGBTRcg6EA6e3OgKYEFQ5qsMXnoU17mf/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2023 Paper 2: Organic and Physical Chemistry 7405/2", qpUrl: "https://drive.google.com/file/d/1Jxjas-B3ke8KOXq3CoZpbyaooO2GBknz/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1jpNq3AuOMQ7zC2o-K0tSpnEmSSE4F0nh/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2023 Paper 3 7405/3", qpUrl: "https://drive.google.com/file/d/1cxP7tD27aerpl_yZ1Dex-HVUfjoqVNQG/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1gQNs4HrlwdnARp1SI80QYWqK9I7PxoKc/view?usp=drive_link", board: "AQA A Level" }
    ]
  },
  {
    year: "2022",
    papers: [
      { label: "June 2022 Paper 1: Inorganic and Physical Chemistry 7405/1", qpUrl: "https://drive.google.com/file/d/1mhFTeVr-AkHctDMBoiepUo39tX6a4kZG/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/115tdbwwxkqP51RrxU84IIoWr4Euit1Mc/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2022 Paper 2: Organic and Physical Chemistry 7405/2", qpUrl: "https://drive.google.com/file/d/1gstr4rjnKfyOp9GsYDdM7uNFu79zF4eR/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1qpCUp2JJew1RJ_gujXi8QasJ_eosY4hq/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2022 Paper 3 7405/3", qpUrl: "https://drive.google.com/file/d/1CJ3tvlgoQDzgCCOs9faDymx_dDwb0Oe5/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1eI9rKFB6FCpJqd8I7nY9jrZ3aibJMqII/view?usp=drive_link", board: "AQA A Level" }
    ]
  },
  {
    year: "2021",
    papers: [
      { label: "June 2021 Paper 1: Inorganic and Physical Chemistry 7405/1", qpUrl: "https://drive.google.com/file/d/1u03l_SqV2xVUgCQV5usexa0m_0Dwnf-Y/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1LVxKLZIltQ5ETit51EgpK6PrTW43xol1/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2021 Paper 2: Organic and Physical Chemistry 7405/2", qpUrl: "https://drive.google.com/file/d/1J8GRsGYWrbgFIHnHWH5UA1P7pANkSxc8/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1ydbKr_ZMsBLu3sJ93C7b0pgfD85l2iHK/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2021 Paper 3 7405/3", qpUrl: "https://drive.google.com/file/d/1t-m0Ia-n1oGtkW47suX-xg8xQHk1syAj/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1ysenO_Zd2iV5lAAWwGBswI1OeBzGhxxC/view?usp=drive_link", board: "AQA A Level" }
    ]
  },
  {
    year: "2020",
    papers: [
      { label: "June 2020 Paper 1: Inorganic and Physical Chemistry 7405/1", qpUrl: "https://drive.google.com/file/d/1-ElgGi4YGdESMenrACOHakPVY9cTV2ee/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1Y4NdeKuQ7wBovsSv2sVuyR5xe2SDmxs9/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2020 Paper 2: Organic and Physical Chemistry 7405/2", qpUrl: "https://drive.google.com/file/d/1wZu_NIGla6cQNXq8D_7p3IEmD5SWwJzK/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1wnUXnv5H8CgOdJbuty374Gbn_74hSI8T/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2020 Paper 3 7405/3", qpUrl: "https://drive.google.com/file/d/1Yn1Tk4nHUfay_H7f8SwVcmHWhvqrPVMI/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1W4eE5N5gfbM8FmEsXayBWIZE7RjrahTO/view?usp=drive_link", board: "AQA A Level" }
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "June 2019 Paper 1: Inorganic and Physical Chemistry 7405/1", qpUrl: "https://drive.google.com/file/d/1o4UGnqB-6iOu4zyBUO5tDGRsGlH0KKbo/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1h1LnIc5Egn3Bp6SzNPp-CrsA1TxFsubo/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2019 Paper 2: Organic and Physical Chemistry 7405/2", qpUrl: "https://drive.google.com/file/d/1YAh0uKOROvVvIdvo41ovkykRqmY67k5P/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/12ndVeIz45tAKzRXGkF7zTWlxtY4PWo6p/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2019 Paper 3 7405/3", qpUrl: "https://drive.google.com/file/d/1iejOT4bjwOj3GA_UuHMKmoiGj33uRJI2/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1qtxe74GwtTNt9SpjYNa-4W9JQIPENfTr/view?usp=drive_link", board: "AQA A Level" }
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "June 2018 Paper 1: Inorganic and Physical Chemistry 7405/1", qpUrl: "https://drive.google.com/file/d/10RkC3WAmOgHjilqBPP98UUPRsz5BHFuU/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/152Nx650fRG92yOrBg71gudo9SWPO0tGa/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2018 Paper 2: Organic and Physical Chemistry 7405/2", qpUrl: "https://drive.google.com/file/d/1LfRtY7cDioFMr-CS31ChlOKQXp8X3Qwb/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1SUf4PqzzhntfN7GarKxno1dea4S4MU4f/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2018 Paper 3 7405/3", qpUrl: "https://drive.google.com/file/d/1BPGTzexNEZRJXuhqmboBuRz2rzU3dfhk/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1bNeondDl1kvML_Y3G3NRStJLbRSh6HJ0/view?usp=drive_link", board: "AQA A Level" }
    ]
  },
  {
    year: "2017",
    papers: [
      { label: "June 2017 Paper 1: Inorganic and Physical Chemistry 7405/1", qpUrl: "https://drive.google.com/file/d/1JphPc4_SCBlOVuHpLy-ZT80_DUONAhJH/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1HKTCEErNzPCZjtPAhJIC4xlJevQRwN0-/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2017 Paper 2: Organic and Physical Chemistry 7405/2", qpUrl: "https://drive.google.com/file/d/1XrLuIoV4VtQRh41dmCGq2p5_ikCF5XTp/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1R_gKdPr0bGcyWrmK861C_-urricVcyTF/view?usp=drive_link", board: "AQA A Level" },
      { label: "June 2017 Paper 3 7405/3", qpUrl: "https://drive.google.com/file/d/1d5-PDdAHPowIGpvk-QCHttpt_aux8vHv/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/12Llg91pp8_MjPjjseticqhhQyOA3tISz/view?usp=drive_link", board: "AQA A Level" }
    ]
  }
];

const cieALevelChemPapers = [
  {
    year:"2025",
    papers: [
      { label: "June 2025 Paper 1,2,3,4,5: 9701/...", qpUrl: "https://drive.google.com/drive/folders/13RYsOt8UhL9vAj_ym25vGgoGG4-lUXqh?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1kLgjrgAueil_k7mDztCaM3t0EDNMNy-U?usp=drive_link", board: "CIE A Level" },
    ]
  },
  {
    year:"2024",
    papers: [
      { label: "June 2024 Paper 1,2,3,4,5: 9701/...", qpUrl: "https://drive.google.com/drive/folders/1mWrqQByJY8dc1nAQ-GhAQfVA3StWSsFP?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1VuHLtNvKE-VUF_B1bKdF74VF2_Qoz__F?usp=drive_link", board: "CIE A Level" },
    ]
  },
  {
    year:"2023",
    papers: [
      { label: "June 2023 Paper 1,2,3,4,5: 9701/...", qpUrl: "https://drive.google.com/drive/folders/1KN40LpGbpH8d1_uD7FfnXdzBQIQKnpbF?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1QC5sK5bSx58o6XGYWPidIaxvKMYFxE4a?usp=drive_link", board: "CIE A Level" },
    ]
  },
  
  {
    year: "2022",
    papers: [
      { label: "June 2022 Paper 1,2,3,4,5:  9701/...", qpUrl: "https://drive.google.com/drive/folders/1Qdwd148Kel00UqQ7LBHn3nSMb2Ai4C00?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1Qdwd148Kel00UqQ7LBHn3nSMb2Ai4C00?usp=drive_link", board: "CIE A Level" },

    ]
  },
  {
    year: "2021",
    papers: [
      { label: "November 2021 Paper 1,2,3,4,5: 9701/...", qpUrl: "https://drive.google.com/drive/folders/1jt-3SoLTB1U8VhFHcivciwCHd-5rey01?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1jt-3SoLTB1U8VhFHcivciwCHd-5rey01?usp=drive_link", board: "CIE A Level" },
    ]
  },
  
  {
    year: "2020",
    papers: [
      { label: "June 2020 Paper 1,2,3,4,5:  9701/...", qpUrl: "https://drive.google.com/drive/folders/1uGLuUVPc73qMAKPfL39L_qJlp1kKvbnS?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1uGLuUVPc73qMAKPfL39L_qJlp1kKvbnS?usp=drive_link", board: "CIE A Level" },

    ]
  },
  
  {
    year: "2019",
    papers: [
      { label: "June 2019 Paper 1,2,3,4,5:  9701/...", qpUrl: "https://drive.google.com/drive/folders/1qxmFjTNWplvBkpJj8dAgLhhlIjUBWW-4?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1qxmFjTNWplvBkpJj8dAgLhhlIjUBWW-4?usp=drive_link", board: "CIE A Level" },

    ]
  },
  
  {
    year: "2018",
    papers: [
      { label: "June 2018 Paper 1,2,3,4,5:  9701/...", qpUrl: "https://drive.google.com/drive/folders/1AlCWLXbLKC0im4fU878sdW8sJwdYK3Gx?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1AlCWLXbLKC0im4fU878sdW8sJwdYK3Gx?usp=drive_link", board: "CIE A Level" },

    ]
  }
];

const edexcelALevelChemPapers = [
  {
    year: "2023",
    papers: [
      { label: "June 2023 Paper 1,2,3: 9CH0/...", qpUrl: "https://drive.google.com/drive/folders/1gTzPUutRIf8bE2VL8XleArr5yje7I7EK?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1sigjsuVX_DtBLG45M22haj4tJfNaDGQM?usp=drive_link", board: "Edexcel A Level" },
      
    ]
  },
  {
    year: "2022",
    papers: [
      { label: "June 2022 Paper 1,2,3: 9CH0/...", qpUrl: "https://drive.google.com/drive/folders/1eLe7wODM200qlNFVV0recvfVFdNeoiTh?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1EaIch1CeO_YJQZ5PkaEVHvoo69AmD8Pd?usp=drive_link", board: "Edexcel A Level" },
    ]
  },
  {
    year: "2021",
    papers: [
      { label: "November 2021 Paper 1,2,3: 9CH0/...", qpUrl: "https://drive.google.com/drive/folders/1X6sPPfQkjywlf6_f4gcT-h6B6Jdb-dRw?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1lgAW8vVBK17vStoj2TS5wmBh5UNDiOWP?usp=drive_link", board: "Edexcel A Level" },
    ]
  },
  {
    year: "2020",
    papers: [
      { label: "October 2020 Paper 1,2,3: 9CH0/...", qpUrl: "https://drive.google.com/drive/folders/1UQMs7fyNbEw2jDBtPTwpucTc854jnGQH?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1vTpZ85l02zX3U9IqAh8UR6HAZltfvMI1?usp=drive_link", board: "Edexcel A Level" },
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "June 2019 Paper 1,2,3: 9CH0/...", qpUrl: "https://drive.google.com/drive/folders/14aQmu7RcQaNUVsf1XhQkxBbiWoiS8jv3?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1mPGrG4som4FQJJ91BETlDk2CakIrV7ov?usp=drive_link", board: "Edexcel A Level" },
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "June 2018 Paper 1,2,3: 9CH0/...", qpUrl: "https://drive.google.com/drive/folders/1RfUG0mMQTEcPMUAxQdd4AX4ZuSU4y-8c?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1aUTAGcYs2j7sAdOX598lVsP42az9HVzm?usp=drive_link", board: "Edexcel A Level" },
    ]
  }
];

const ocrALevelChemAPapers = [
  {
    year: "Specimen Paper",
    papers: [
      { label: " Specimen Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/1FSP9uMYkP_SFxu_4fgABzMLeUYUkPSZx?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1MesMzIjSnlDZkGTjImKsWSmijk4WbIN6?usp=drive_link", board: "OCR A Level Chemistry A" },
    ]
  },
  {
    year: "2023",
    papers: [
      { label: " 2023 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/1QgL-bnu3KBsLaO8mFtrCBn-nR0zNsnCa?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1ocY4FVR93P9QtpTSIMPo_L0_iqXzkzkQ?usp=drive_link", board: "OCR A Level Chemistry A" },
    ]
  },
  {
    year: "2022",
    papers: [
      { label: "2022 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/1wcDvx0RPgOSbfb1htLKYuJFNl47Mf9At?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1jUgmE_EE8Lcd-w4kssCxHXOihDQ9DUcU?usp=drive_link", board: "OCR A Level Chemistry A" },
    ]
  },
  {
    year: "2021",
    papers: [
      { label: "2021 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/1YXL6u-xEu24w-l0ZzpE64mURhq3tZDcu?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1ljyaGdRZtjHtMQ3RrMPqOfI7akLGgbD6?usp=drive_link", board: "OCR A Level Chemistry A" },
    ]
  },
  {
    year: "2020",
    papers: [
      { label: "2020 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/14EJ1k-SRqr0_Wvxok6zqIlclPY5orHeZ?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1-kwSh2F3Xyg6MAgVFAAVDIDu2BIuy73K?usp=drive_link", board: "OCR A Level Chemistry A" },
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "2019 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/1TcD1v3D2l1tLUQEurJqtzJFZ1ODCuw_q?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1S-8Hb7FlVEnDihaEyR3lftmwzDejxIgC?usp=drive_link", board: "OCR A Level Chemistry A" },
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "2018 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/16P1nNv95bGHYEZJobEYLp1bAf-yx7MAt?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1zUsJUfzH4auZqho3YoydUIYBqP_sqEcC?usp=drive_link", board: "OCR A Level Chemistry A" },
    ]
  },
  {
    year: "2017",
    papers: [
      { label: "2017 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/1J1ElDoxowHRV9DpIOL9K5bt0PiYlxCNQ?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1csWlm4NPzZjGgw0xiSOuyNdqFX-OOFqU?usp=drive_link", board: "OCR A Level Chemistry A" },
    ]
  },
  {
    year: "2016",
    papers: [
      { label: "2016 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/1pH2AiaoiVayiFbCfUeB1jdK4w2--Pl4x?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1_N6lxc6WCh-pFDXD-GPDm1eQ5OXY1PGM?usp=drive_link", board: "OCR A Level Chemistry A" },
    ]
  }
];

const ocrALevelChemBPapers = [
  {
    year: "2022",
    papers: [
      { label: " 2022 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/1lA6LMIcqj33U5_t4NFz4UXL0jEfXeHiQ?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1sFjcpP54Rikfcx6KeJdTGIf8uBfUenne?usp=drive_link", board: "OCR A Level Chemistry B (Salters)" },
     
    ]
  },
  {
    year: "2021",
    papers: [
      { label: " 2021 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/1TtquSoJZO3VGB7jI3GZqlmD7hluRVMwG?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1dLiAeuH8JFo8liAGmpGMWMB538jtRl5g?usp=drive_link", board: "OCR A Level Chemistry B (Salters)" },
     
    ]
  },
  {
    year: "2020",
    papers: [
      { label: " 2020 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/1Zz_AF-NNEVo5h7w5B5eWyEAw8-YNHwVR?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1dW87Cs_KDMHCdo4eOCfW_pttLUrRfrUK?usp=drive_link", board: "OCR A Level Chemistry B (Salters)" },
     
    ]
  },
  {
    year: "2019",
    papers: [
      { label: " 2019 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/1xtN8tCkrswBeISv_9rNJoGW1xRHGgpwj?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1e-qcvCSUVte1RHVyeVzP5wXUcoEr07pA?usp=drive_link", board: "OCR A Level Chemistry B (Salters)" },
      
    ]
  },
  {
    year: "2018",
    papers: [
      { label: " 2018 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/1vfy6shsqA7yvAn6vXOFwEctwo77Srlf1?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1zUsJUfzH4auZqho3YoydUIYBqP_sqEcC?usp=drive_link", board: "OCR A Level Chemistry B (Salters)" },
    ]
  },
  {
    year: "2017",
    papers: [
      { label: " 2017 Paper 1,2,3: ", qpUrl: "https://drive.google.com/drive/folders/12hwZRoqHvnxxFvbm2hcgUPjA2hZOtUDd?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1YKTAoQO-a93Vozp0nOfe3ACQRJRNPujk?usp=drive_link", board: "OCR A Level Chemistry B (Salters)" },
      
    ]
  }
];

const sqaAdvHigherChemPapers = [
  {
    year: "2023",
    papers: [
      { label: "May 2023 section 1", qpUrl: "https://drive.google.com/drive/u/3/folders/1UZVpDfemLMVeS903nj2A6HJcgZD5mF7E?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1UZVpDfemLMVeS903nj2A6HJcgZD5mF7E?dmr=1&ec=wgc-drive-hero-goto", board: "SQA Advanced Higher" },
      { label: "May 2023 section 2", qpUrl: "https://drive.google.com/file/d/17xrmAD8hOldtOZ6u5udxJEISyJazy2Ch/view?usp=drive_link", msUrl: "", board: "SQA Advanced Higher" }
    ]
  },
  {
    year: "2022",
    papers: [
      { label: "May 2022 section 1", qpUrl: "https://drive.google.com/drive/u/3/folders/1UZVpDfemLMVeS903nj2A6HJcgZD5mF7E?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1UZVpDfemLMVeS903nj2A6HJcgZD5mF7E?dmr=1&ec=wgc-drive-hero-goto", board: "SQA Advanced Higher" },
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "May 2019 section 1", qpUrl: "https://drive.google.com/file/d/1yprXVbaK1qSHDxHFFUYF9u4KKZTbtrwJ/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1kv5qe1oXh0Pn9r4se0ZMPjy6JSR9xOXm/view?usp=drive_link", board: "SQA Advanced Higher" },
      { label: "May 2019 section 2", qpUrl: "https://drive.google.com/file/d/1VxrKk1iNqXKO-wtVzP5nohMyvfbMXrg2/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1q85FJdh51rA0EZu-ZhohWylT72QgdvTR/view?usp=drive_link", board: "SQA Advanced Higher" }
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "May 2018 section 1", qpUrl: "https://drive.google.com/file/d/1yyFF5GWuDypCNFPm3IMlGnNo9V5phB_E/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1bdq2khhbBIKSRBvcaj4hUSRrzaV2oC2d/view?usp=drive_link", board: "SQA Advanced Higher" },
      { label: "May 2018 section 2", qpUrl: "https://drive.google.com/file/d/1uGyFUKDmnx0DJZ9Y5KPPEs6aLlWjWbQX/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1RITdVIk_qWbiizo-se-4SjoOVUk-zgdK/view?usp=drive_link", board: "SQA Advanced Higher" }
    ]
  }
];

const sqaHigherChemPapers = [
  {
    year: "2023",
    papers: [
      {
        label: "May 2023 Paper 1: Multiple Choice X813/76/12",
        qpUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        msUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        board: "SQA Higher Chemistry"
      },
      {
        label: "May 2023 Paper 2 X813/76/01",
        qpUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        msUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        board: "SQA Higher Chemistry"
      }
    ]
  },
  {
    year: "2022",
    papers: [
      {
        label: "May 2022 Paper 1: Multiple Choice X813/76/12",
        qpUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        msUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        board: "SQA Higher Chemistry"
      },
      {
        label: "May 2022 Paper 2 X813/76/01",
        qpUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        msUrl: "https://drive.google.com/file/d/1FfFfFfFfFfFfFfFfFfFfFfFfFfFfFfFf/view?usp=drive_link",
        board: "SQA Higher Chemistry"
      }
    ]
  },
  {
    year: "2019",
    papers: [
      {
        label: "May 2019 Paper 1: Multiple Choice X813/76",
        qpUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        msUrl: "https://drive.google.com/file/d/1s9roE9WgJPZJ25fwuaMe-RLBSV1ILXR5/view?usp=drive_link",
        board: "SQA Higher Chemistry"
      },
      {
        label: "May 2019 Paper 2 X813/76/01",
        qpUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        msUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        board: "SQA Higher Chemistry"
      }
    ]
  },
  {
    year: "2018",
    papers: [
      {
        label: "May 2018 Paper 1: Multiple Choice X713/76",
        qpUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        msUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        board: "SQA Higher Chemistry"
      },
      {
        label: "May 2018 Paper 2 X713/76",
        qpUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        msUrl: "https://drive.google.com/drive/u/3/folders/1hA0t_Ngza4klmFu-lGrf9IwGr7EZhQ1J?dmr=1&ec=wgc-drive-hero-goto",
        board: "SQA Higher Chemistry"
      }
    ]
  }
];

const aqaGcseChemPapers = [
  {
    year: "Specimen Paper",
    papers: [
      { label: "Specimen Paper 1,2: Higher Tier/ Foundation Tier 8462/...", qpUrl: "https://drive.google.com/drive/folders/1nft4ITg2y_HWg6guuobtkLCMjZPMLToY?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1b_EBjm7W5ri_DcfV15uXFaf89_Yyu4Tc?usp=drive_link", board: "AQA GCSE" },
      
    ]
  },
  {
    year: "2023",
    papers: [
      { label: "June 2023 Paper 1,2: Higher Tier/ Foundation Tier 8462/...", qpUrl: "https://drive.google.com/drive/folders/15Y8tIxzbGT_PtQ6m8sxI0B3YNKdYcasE?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/15eu_1W9SMEh_LZAEadXFic3hi282s-Lb?usp=drive_link", board: "AQA GCSE" },
      
    ]
  },
  {
    year: "2022",
    papers: [
      { label: "June 2022 Paper 1,2: Higher Tier/ Foundation Tier 8462/...", qpUrl: "https://drive.google.com/drive/folders/1L5hgPtABhx8_8IYNEIiOq5QZE7a-NT6f?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1yD_L22WrTXhYuLP1McE6VJiq_z5x67ku?usp=drive_link", board: "AQA GCSE" },
      
    ]
  },
  {
    year: "2021",
    papers: [
      { label: "November 2021 Paper 1,2: Higher Tier/ Foundation Tier 8462/...", qpUrl: "https://drive.google.com/drive/folders/1Kz6pSMQZ7SBWOXgQsd9IwnlJo6uiuGHr?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1LKnFrGs5xfj1HDRm5oA9oaPexr9VLWG7?usp=drive_link", board: "AQA GCSE" },
      
    ]
  },
  {
    year: "2020",
    papers: [
      { label: "November 2020 Paper 1,2: Higher Tier/ Foundation Tier 8462/...", qpUrl: "https://drive.google.com/drive/folders/1l_KUbPUV1ScXwzaDNT57k90eDt2Ircqu?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/12QXVSmhE-0t4cBM2pKGO1CfyWnuJqR23?usp=drive_link", board: "AQA GCSE" },
      
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "June 2019 Paper 1,2: Higher Tier/ Foundation Tier 8462/...", qpUrl: "https://drive.google.com/drive/folders/1EPScNxVyqiFpDYuQk6D_jqje_5Ip6z7f?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1vCeS36W3tGHFFr5v7W41uS98rbxvFdeA?usp=drive_link", board: "AQA GCSE" },
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "June 2018 Paper 1,2: Higher Tier/ Foundation Tier 8462/...", qpUrl: "https://drive.google.com/drive/folders/1CzZhLefM5aNa20NB0Yr53p0pEroLWH--?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1SoYJyzS6--kdKPMBo4E0mjf04aZjrbne?usp=drive_link", board: "AQA GCSE" },
    ]
  }
];

const edexcelGcseChemPapers = [
  {
    year: "Specimen Paper",
    papers: [
      { label: "Specimen Paper 1,2: Higher Tier / Foundation Tier", qpUrl: "https://drive.google.com/drive/folders/1TyCP0-ydEhD5mdzll09RpRZblUlATgFj?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1FAPf-CYIv6vbzelZWzvCQ005rKZpfwBr?usp=drive_link", board: "Edexcel GCSE" }
      
    ]
  },
  {
    year: "2023",
    papers: [
      { label: "June 2023 Paper 1,2: Higher Tier / Foundation Tier", qpUrl: "https://drive.google.com/drive/folders/1mZKNG94hXoorvgVq0E_b_G6_wOeRkQwo?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1o1o9n6JaRt5OysnehnzUKmZdBHaXENjo?usp=drive_link", board: "Edexcel GCSE" }
      
    ]
  },
  {
    year: "2022",
    papers: [
      { label: "June 2022 PPaper 1,2: Higher Tier / Foundation Tier", qpUrl: "https://drive.google.com/drive/folders/15Te-Qnvx62wNhiCxbsjx4pC0aoPYt5G4?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1NSD6t-a-Pz2JYHkTB146gvypKKpVys30?usp=drive_link", board: "Edexcel GCSE" }
     
    ]
  },
  {
    year: "2021",
    papers: [
      { label: "November 2021 Paper 1,2: Higher Tier / Foundation Tier", qpUrl: "https://drive.google.com/drive/folders/1Lpo-XYQOqQ79tkFbzRcpaM7on8YrN5Fw?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/10RDX5bPohQaV8FHw-Q9e1nwX3eUGdDbt?usp=drive_link", board: "Edexcel GCSE" }
      
    ]
  },
  {
    year: "2020",
    papers: [
      { label: "November 2020 Paper 1,2: Higher Tier / Foundation Tier", qpUrl: "https://drive.google.com/drive/folders/1__KDjd4S5B01EnkY4jYPRaDQzPXk8vKZ?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1k-GYW9nkiwAoiB2eacw0SyYcWB0yOP2h?usp=drive_link", board: "Edexcel GCSE" }
      
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "June 2019 Paper 1,2: Higher Tier / Foundation Tier", qpUrl: "https://drive.google.com/drive/folders/1-SJ-XjeYpZ84uHE3aes-isS6QvOyFk6l?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1L_v2VOHiEQKsZhTZK7Myb0rEaAHj2pBb?usp=drive_link", board: "Edexcel GCSE" }
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "June 2018 Paper 1,2: Higher Tier / Foundation Tier", qpUrl: "https://drive.google.com/drive/folders/1nf2D0zLES9rLoi-AlLZFMcwvaZYyAg-A?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1yBktTum9odv-36lBcwCYWEJHZ31YIB4C?usp=drive_link", board: "Edexcel GCSE" } 
    ]
  }
];    

const wjecALevelChemPapers = [
  {
    year: "2022",
    papers: [
      { label: "June 2022 Unit 1: The Language of Chemistry, Structure of Matter and Simple Reactions ", qpUrl: "https://drive.google.com/file/d/1tOknhTuGbpOUPZYfeGaSL4yYS2PzENwA/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1fjbiAA7svX5XkCGOF8o4b8en7Bc7Rfed/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2022 Unit 2: Energy, Rate and Chemistry of Carbon Compounds ", qpUrl: "https://drive.google.com/file/d/1aQuASe40kyv0I6PsTQ43kMCTHIzVlDoq/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1daij3BpyerhUdvhjiYsLwOGa4_j8uC1T/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2022 Unit 3: Physical and Inorganic Chemistry ", qpUrl: "https://drive.google.com/file/d/1eBTfe7LC_ANec1bNy7bhMjI5FY5FV4sN/view?usp=drive_link", msUrl: "", board: "WJEC A Level" },
      { label: "June 2022 Unit 4: Organic Chemistry and Analysis ", qpUrl: "https://drive.google.com/file/d/1_PCkh9TZCdU7ZRehdGFFpCg2I2qzj8F-/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1cvf7p1LwFB5z5pRoLsxLSOug4Uv_E3Bd/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2022 Unit 5: Practical Examination Experimental Task ", qpUrl: "https://drive.google.com/file/d/1DVLGrgTS4XY5WCF4zPExfPqGw3oZYpDT/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/17Bt4BIKKNdVKTmIl7sNZDpSQvxcnJr2C/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2022 Unit 5: Practical Methods and Analysis Task ", qpUrl: "https://drive.google.com/file/d/127JidjbnBI5LLBZ6G7ew-y7HsOwkMxOu/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1T8xqQfcsLoqpEiR-qXQ4kXdm4S_UZBZR/view?usp=drive_link", board: "WJEC A Level" },
    ]
  },
  {
    year: "2019",
    papers: [
      { label: "June 2019 Unit 1: The Language of Chemistry, Structure of Matter and Simple Reactions ", qpUrl: "https://drive.google.com/file/d/1kAd-yasSTw0k7coXQvSexNVWAnTxQnFs/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1VOu-4NW3URvVLKQg0RqD-V0QWbxCTNJy/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2019 Unit 2: Energy, Rate and Chemistry of Carbon Compounds ", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1H4stt_ymw0qR_S5r_2Z0TOcwvCEgtE0V/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2019 Unit 3: Physical and Inorganic Chemistry ", qpUrl: "https://drive.google.com/file/d/1AYwYrjs4_GaO5f5aTqbbIbHyFj9iWLtt/view?usp=drive_link", msUrl: "", board: "WJEC A Level" },
      { label: "June 2019 Unit 4: Organic Chemistry and Analysis ", qpUrl: "https://drive.google.com/file/d/1A-CyvlFVpA2M88esOulV_-LtnP_uUMSg/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1u1Pr4DJuarYLbVKrE0SGkxuiG2aOtIsP/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2019 Unit 5: Practical Examination Experimental Task ", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1zQaUAjBCIpesbnkVQmDcOIfB7tcqEOo7/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2019 Unit 5: Practical Methods and Analysis Task ", qpUrl: "https://drive.google.com/file/d/1Mxpp2KG74kYS34KQBuPpiaf3pd99t8UO/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1701gkck5UEzyfPhM2NPZCgHUQA55NrZv/view?usp=drive_link", board: "WJEC A Level" },
    ]
  },
  {
    year: "2018",
    papers: [
      { label: "June 2018 Unit 1: The Language of Chemistry, Structure of Matter and Simple Reactions ", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/11SAcHyDdsBVlNp3U4O79IOWQn27xNUrp/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2018 Unit 2: Energy, Rate and Chemistry of Carbon Compounds ", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1P9_kCT7tvtu7Mwz7yPeJrIhIErvoRFle/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2018 Unit 3: Physical and Inorganic Chemistry ", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1heAltkJwG6eIHYCz1p_mOPDf3sHxMcYz/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2018 Unit 4: Organic Chemistry and Analysis ", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "", board: "WJEC A Level" },
      { label: "June 2018 Unit 5: Practical Examination Experimental Task ", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1cSrN1iaACt1ii0HWuVedRq5oPWbokm8G/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2018 Unit 5: Practical Methods and Analysis Task ", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1NrAMWOGylXDEjJIsR8oHKcHidlE6_EPn/view?usp=drive_link", board: "WJEC A Level" },
    ]
  },
  {
    year: "2017",
    papers: [
      { label: "June 2017 Unit 1: The Language of Chemistry, Structure of Matter and Simple Reactions (QP)", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1CLMOhv56mdgUE0nVFYw2MFXPswJIE1-B/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2017 Unit 2: Energy, rate and chemistry of carbon compounds ", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1ReS-FzOeHl_-OXsdfJXqV1gVI0HcmzbD/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2017 Unit 3: Physical and inorganic chemistry ", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1JIyOJjTiIVHo6MVEexyy5o-fJ2LxIsN4/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2017 Unit 4: Organic chemistry and analysis ", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1_S6fnRbGhx9s1en7dtQ5kPFez6X0Quet/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2017 Unit 5: Practical Examination Experimental Task", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/180SQcP1j_7uOgFxJnfbkoXZE0KWw3lGm/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2017 Unit 5: Practical Methods and Analysis Task", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/15Aj0WBMworTCkkU7dR9Yu8kY-eAfcpUr/view?usp=drive_link", board: "WJEC A Level" }
    ]
  },
  {
    year: "2016",
    papers: [
      { label: "June 2016 Unit 3: The Language of Chemistry, Structure of Matter and Simple Reactions", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1hTKpvuqetxvPDRElrlTHzdGXs7uu-NsL/view?usp=drive_link", board: "WJEC A Level" },
      { label: "June 2016 Unit 4: Energy, Rate and Chemistry of Carbon Compounds", qpUrl: "https://drive.google.com/drive/u/3/folders/1AFIwac3xtwbLpzqvJFVY-ylXxLw_x8zr?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1_S6fnRbGhx9s1en7dtQ5kPFez6X0Quet/view?usp=drive_link", board: "WJEC A Level" }
    ]
  }
];

  const edexcelIgcseChemPapers = [
    {
      year: "2023",
      papers: [
        { label: "June 2023 Paper 1,2: Chemistry 4CH1/...", qpUrl: "https://drive.google.com/drive/folders/1LURssZ-HL0q4Z6cQYrTXHm3mPMZzJ3QC?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1GwcG6YIaHv3uJvo_ZzHSVnx60oEOdXJb?usp=drive_link", board: "Edexcel IGCSE Chemistry" },
      ]
    },
    {
      year: "2022",
      papers: [
        { label: "June 2022 Paper 1,2: Chemistry 4CH1/...", qpUrl: "https://drive.google.com/drive/folders/1fJcMf02qXioxfyXqjKzVH-bdhBI6qK71?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/17MJuhGV9XnDS0gkaP3IAL5vFpycbEIC9?usp=drive_link", board: "Edexcel IGCSE Chemistry" },
      ]
    },
    {
      year: "2021",
      papers: [
        { label: "January 2021 Paper 1,2: Chemistry 4CH1/...", qpUrl: "https://drive.google.com/drive/folders/1drGBiNSS6eaPNHA59x9n0Ip3JNI_CJi_?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1-xOTpz-hbA4PgVFxf9CJLHWReomsmHVl?usp=drive_link", board: "Edexcel IGCSE Chemistry" },
      ]
    },
    {
      year: "2020",
      papers: [
        { label: "January 2020 Paper 1,2: Chemistry 4CH1/...", qpUrl: "https://drive.google.com/drive/folders/17tD5PTwyFh9dD_iDYLe6o3ye6qJJzdQK?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/14prKr7F7V8yVOXHSW_ybwSr5XJyzLMTy?usp=drive_link", board: "Edexcel IGCSE Chemistry" },
      ]
    },
    {
      year: "2019",
      papers: [
        { label: "June 2019 Paper 1,2: Chemistry 4CH1/...", qpUrl: "https://drive.google.com/drive/folders/1j-aUNAhIc6f2w5IzfmOgKK1TaPuhJl9v?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1DVVdK40to21FQeSeAa3dPNSU1tGUH8fy?usp=drive_link", board: "Edexcel IGCSE Chemistry" },
      ]
    }
  ];
  
  const edexcelIgcseChemModularUnit1Papers = [
    {
      year: "Specimen Papers",
      papers: [
        { label: "Unit 1 4WCH1/1C ", qpUrl: "https://drive.google.com/drive/u/3/folders/1PutavuOQaQw-JFBzCuTWhP7nFhD6Fr8H?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1PutavuOQaQw-JFBzCuTWhP7nFhD6Fr8H?dmr=1&ec=wgc-drive-hero-goto", board: "Edexcel IGCSE Chemistry (Modular)" },
        { label: "Unit 2 4WCH2/1C ", qpUrl: "https://drive.google.com/drive/u/3/folders/1PutavuOQaQw-JFBzCuTWhP7nFhD6Fr8H?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1PutavuOQaQw-JFBzCuTWhP7nFhD6Fr8H?dmr=1&ec=wgc-drive-hero-goto", board: "Edexcel IGCSE Chemistry (Modular)" },
      ]
    }
  ];
  
  const wjecgcsechemPapers = [
    {
      year: "2023",
      papers: [
        { label: "2023  Papers ", qpUrl: "https://drive.google.com/drive/folders/1MIao3M72CPyt-7EUsVo3nwAp5PiAt8H0?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1U1BufGR9sPoI2bRA0H0T_awXy3H1Z_K6?usp=drive_link", board: "WJEC IGCSE Chemistry" },
      ]
    },
    {
      year: "2022",
      papers: [
        { label: "2022  Papers ", qpUrl: "https://drive.google.com/drive/folders/1OS158UUCu6ryeTK48dMPPSr5kIkl6oyl?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1dkEEYbzSci6oznL4p6lT9P8O6lrJvXe2?usp=drive_link", board: "WJEC IGCSE Chemistry" },
      ]
    },
    {
      year: "2019",
      papers: [
        { label: "2019  Papers ", qpUrl: "https://drive.google.com/drive/folders/1y5dNk5-RoY_gaajxeombJLx6fuTBezp5?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1SWQJdLmp7WikOm28F9zYsu2X-nqQRlHn?usp=drive_link", board: "WJEC IGCSE Chemistry" },
      ]
    },
    {
      year: "2018",
      papers: [
        { label: "2018  Papers ", qpUrl: "https://drive.google.com/drive/folders/1sGCeW-JD_q3BdpGySe38nhXU29Ccyd07?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1oXeRjQ2klp-eu3urHCjlU_4D3Dp7uD7Z?usp=drive_link", board: "WJEC IGCSE Chemistry" },
      ]
    },
    {
      year: "2017",
      papers: [
        { label: "2017  Papers ", qpUrl: "https://drive.google.com/drive/folders/1THsKTrpW0U14Ub7Sxqgj8S7hE2VFA3Bo?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1B4rGv8TwRW7fG0h8V-ldrgegwDhQiCu3?usp=drive_link", board: "WJEC IGCSE Chemistry" },
      ]
    }
  ];
  const edexcelIgcseChemModularUnit2Papers = [
    {
      year: "Specimen Papers",
      papers: [
        { label: "Unit 1 4WCH1/1C ", qpUrl: "https://drive.google.com/drive/u/3/folders/1RzrZyRsSTznP75QZREMjHNDEwjp28FW3?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1RzrZyRsSTznP75QZREMjHNDEwjp28FW3?dmr=1&ec=wgc-drive-hero-goto", board: "Edexcel IGCSE Chemistry (Modular)" },
        { label: "Unit 2 4WCH2/1C ", qpUrl: "https://drive.google.com/drive/u/3/folders/1RzrZyRsSTznP75QZREMjHNDEwjp28FW3?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1RzrZyRsSTznP75QZREMjHNDEwjp28FW3?dmr=1&ec=wgc-drive-hero-goto", board: "Edexcel IGCSE Chemistry (Modular)" },
      ]
    }
  ];
  
  const oxfordAqaIgcseChemPapers = [
    {
      year: "Specimen Papers",
      papers: [
        { label: "Paper 1 9202/1 ", qpUrl: "https://drive.google.com/drive/u/3/folders/1iJkR9dhCalcU8AxXSNOJWLCCddHZXBEi?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1iJkR9dhCalcU8AxXSNOJWLCCddHZXBEi?dmr=1&ec=wgc-drive-hero-goto", board: "Oxford AQA IGCSE Chemistry" },
        { label: "Paper 2 9202/2 ", qpUrl: "https://drive.google.com/drive/u/3/folders/1iJkR9dhCalcU8AxXSNOJWLCCddHZXBEi?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1iJkR9dhCalcU8AxXSNOJWLCCddHZXBEi?dmr=1&ec=wgc-drive-hero-goto", board: "Oxford AQA IGCSE Chemistry" },
      ]
    }
  ];

  const cambridgeCIEIGCSEChemPapers = [
    {
    year:"2025",
    papers: [
      { label: "June 2025 Papers", qpUrl: "https://drive.google.com/drive/folders/17uLGpqOWq-4T3rSjTli_PqqvpZT5xcOr?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1zc34Q6RxxVK5CSYJlDnX391AAHOnl5OE?usp=drive_link", board: "CIE GCSE Level" },
    ]
    },
    {
    year:"2024",
    papers: [
      { label: "June 2024 Papers", qpUrl: "https://drive.google.com/drive/folders/1H7H08HNdQeinGJo-xdrsMNNxPwscbBAu?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1jgvc0n-ElS-7htNcHZW7EesdbP1j__gu?usp=drive_link", board: "CIE GCSE Level" },
    ]
    },
    {
      year: "2023",
      papers: [
        { label: "2023  Papers ", qpUrl: "https://drive.google.com/drive/folders/1ITohbZwoM-krDTn6KnGscmTKULSQvveX?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1WWmMWzG5cfGxPMFtwnnv5-7sNpwGgKR4?usp=drive_link", board: "Cambridge CIE IGCSE Chemistry" },
      ]
    },
    {
      year: "2022",
      papers: [
        { label: "2022 papers ", qpUrl: "https://drive.google.com/drive/folders/1Hwc0X0YPV6y2CKzuiI13Tz4nFYK4W_sY?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1-u8SdlBPQVkE_tVQPzkvaW_aS9HwOXNL?usp=drive_link", board: "Cambridge CIE IGCSE Chemistry" },
      ]
    },
    {
      year: "2021",
      papers: [
        { label: "2021 papers ", qpUrl: "https://drive.google.com/drive/folders/1Mwpqkb3YnUQv6ZRfwln1k2Xv5V5F8sDG?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1-Ny0OTopox99WOA3D_BY-inJpHYxKBO7?usp=drive_link", board: "Cambridge CIE IGCSE Chemistry" },
      ]
    },
    {
      year: "2020",
      papers: [
        { label: "2020 papers ", qpUrl: "https://drive.google.com/drive/folders/1qaoLtYpctc3nnEqp22s_9x7luv-HXAa5?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1EJD80wemWiYq6FIJaexVW0SavEyyMZeP?usp=drive_link", board: "Cambridge CIE IGCSE Chemistry" },
      ]
    },
    {
      year: "2019",
      papers: [
        { label: "2019 papers ", qpUrl: "https://drive.google.com/drive/folders/1vQc0i-W9clDc2vv_Q8VcoSxba3bMV5ad?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1V_UJ4imURQ9ugay9v49gwlt55oJLiLUL?usp=drive_link", board: "Cambridge CIE IGCSE Chemistry" },
      ]
    },
    {
      year: "2018",
      papers: [
        { label: "2018 papers ", qpUrl: "https://drive.google.com/drive/folders/1438Ajuf14mjiiahvdz5cfAC2FedHzMgl?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1Ae-WPCHCcLz4-vK3NNgnWq6l7n1fcfZj?usp=drive_link", board: "Cambridge CIE IGCSE Chemistry" },
      ]
    }

  ];

  const edexcelInternationalASChemPapers = [
    {
      year: "2023",
      papers: [
        { label: "2023  Papers ", qpUrl: "https://drive.google.com/drive/folders/1MyYTw-8bqxGNtrf9q6ugjK3x5DhHyrGh?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1EVC6Qs7hWaLU9v51m2vVxw5iG6x6NyEv?usp=drive_link", board: "Edexcel International AS Chemistry" }
      ]
    },
    {
      year: "2022",
      papers: [
        { label: "2022  Papers ", qpUrl: "https://drive.google.com/drive/folders/120XZgkyXzviB1iIq0_lZX5T_wrZ77H0B?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1FwQO7zG3CgNfqeRxU9ACXsNpEcLc3oLd?usp=drive_link", board: "Edexcel International AS Chemistry" }
      ]
    },
    {
      year: "2021",
      papers: [
        { label: "2021  Papers ", qpUrl: "https://drive.google.com/drive/folders/1_cUh9B0Z1imsgW36aKGOMVoUEzO9EDXt?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1kqZbUyA423AV7Ffm8iyJ6Ibja3PY5GvY?usp=drive_link", board: "Edexcel International AS Chemistry" }
      ]
    },
    {
      year: "2020",
      papers: [
        { label: "2020  Papers ", qpUrl: "https://drive.google.com/drive/folders/1QwOorGmBFs0AxQPRWbp-Et8J3JmBUjyi?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1lGHDqNI8HugwINPNEwtiQw3vUjAUgIX3?usp=drive_link", board: "Edexcel International AS Chemistry" }
      ]
    },
    {
      year: "2019",
      papers: [
        { label: "2019  Papers ", qpUrl: "https://drive.google.com/drive/folders/1iP5Lva1U5bIw0qIcBfv4zhSHXmVNXMFz?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1CUYrnBV82C2R1vBkpDO54glqqgKk4lUO?usp=drive_link", board: "Edexcel International AS Chemistry" }
      ]
    }
  ];
  
  const edexcelIalChemPapers = [
    {
      year: "2023",
      papers: [
        { label: "June 2023 Unit 1,2,3,4,5,6: WCH11/...", qpUrl: "https://drive.google.com/drive/folders/1us53H6_u29oD4K_9CdvkRaamrj66O-Jd?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1WHoZDrJufgY9ofLadkPEP7-09PqjeP0D?usp=drive_link", board: "Edexcel IAL Chemistry" }
        
      ]
    },
    {
      year: "2022",
      papers: [
        { label: "June 2022 Unit 1,2,3,4,5,6: WCH11/...", qpUrl: "https://drive.google.com/drive/folders/15T7nsVoHHoUBoo0Zv3DubZ4xh_8YVM04?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1xStLYSpVt-0MYzJj8PWg_CfdiaJqY7tx?usp=drive_link", board: "Edexcel IAL Chemistry" }
      ]
    },
    {
      year: "2021",
      papers: [
        { label: "January 2021 Unit 1,2,3,4,5,6: WCH11/...", qpUrl: "https://drive.google.com/drive/folders/1nFg3K93hVJ1rCLoS0jJZ9mkbG9sH2NN-?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/198sjX4L0aBq_JmmeADKgj85MBWbdRAXz?usp=drive_link", board: "Edexcel IAL Chemistry" }
      ]
    },
    {
      year: "2020",
      papers: [
        { label: "January 2020 Unit 1,2,3,4,5,6: WCH11/...", qpUrl: "https://drive.google.com/drive/folders/1w329oN9ICI2MNuo-MrjFVgKnGB4un43z?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1Qoi0CcNiq3HOnX_H317wYd6VKBDAuHGv?usp=drive_link", board: "Edexcel IAL Chemistry" }
      ]
    },
    {
      year: "2019",
      papers: [
        { label: "June 2019 Unit 1,2,3,4,5,6: WCH11/...", qpUrl: "https://drive.google.com/drive/folders/1cZgu5l_eJ6lGEB2G7WeWPxtIqIjIkBB3?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1GUXSL8ArO6nRGdFZedS8l5XpzPPN_bhZ?usp=drive_link", board: "Edexcel IAL Chemistry" }
      ]
    }
  ];
  
  const oxfordAqaIalChemPapers = [
    {
      year: "Specimen Papers",
      papers: [
        { label: "Paper 1 9620 ", qpUrl: "https://drive.google.com/drive/u/3/folders/1V83YoNE2DWuC5IFLRPrZb0M4ZCbfiSDz?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/file/d/1YF7GG4uPPyqDEaADMl1cL6PZBPJO6hoG/view", board: "Oxford AQA IAL Chemistry" },
        { label: "Paper 2 9620 ", qpUrl: "https://drive.google.com/drive/u/3/folders/1V83YoNE2DWuC5IFLRPrZb0M4ZCbfiSDz?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1V83YoNE2DWuC5IFLRPrZb0M4ZCbfiSDz?dmr=1&ec=wgc-drive-hero-goto", board: "Oxford AQA IAL Chemistry" },
        { label: "Paper 3 9620 ", qpUrl: "https://drive.google.com/drive/u/3/folders/1V83YoNE2DWuC5IFLRPrZb0M4ZCbfiSDz?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1V83YoNE2DWuC5IFLRPrZb0M4ZCbfiSDz?dmr=1&ec=wgc-drive-hero-goto", board: "Oxford AQA IAL Chemistry" },
        { label: "Paper 4 9620 ", qpUrl: "https://drive.google.com/drive/u/3/folders/1V83YoNE2DWuC5IFLRPrZb0M4ZCbfiSDz?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1V83YoNE2DWuC5IFLRPrZb0M4ZCbfiSDz?dmr=1&ec=wgc-drive-hero-goto", board: "Oxford AQA IAL Chemistry" },
        { label: "Paper 5 9620 ", qpUrl: "https://drive.google.com/drive/u/3/folders/1V83YoNE2DWuC5IFLRPrZb0M4ZCbfiSDz?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1V83YoNE2DWuC5IFLRPrZb0M4ZCbfiSDz?dmr=1&ec=wgc-drive-hero-goto", board: "Oxford AQA IAL Chemistry" }
      ]
    }
  ];
  
  const oxfordAqaIasChemPapers = [
    {
      year: "Specimen Papers",
      papers: [
        { label: "Paper 1 ", qpUrl: "https://drive.google.com/drive/u/3/folders/1mH3tcW4vZ6ZUTnGNMgS4pK3bWnqYLd3M?dmr=1&ec=wgc-drive-hero-goto", msUrl: "https://drive.google.com/drive/u/3/folders/1mH3tcW4vZ6ZUTnGNMgS4pK3bWnqYLd3M?dmr=1&ec=wgc-drive-hero-goto", board: "Oxford AQA IAS Chemistry" },
        { label: "Paper 2 ", qpUrl: "https://drive.google.com/drive/u/3/folders/1mH3tcW4vZ6ZUTnGNMgS4pK3bWnqYLd3M?dmr=1&ec=wgc-drive-hero-goto ", msUrl: "https://drive.google.com/drive/u/3/folders/1mH3tcW4vZ6ZUTnGNMgS4pK3bWnqYLd3M?dmr=1&ec=wgc-drive-hero-goto", board: "Oxford AQA IAS Chemistry" },
      ]
    }
  ];
  
  const sqaNational5ChemPapers = [
    {
      year: "2023",
      papers: [
        { label: "2023  Paper 1", qpUrl: "https://drive.google.com/file/d/1woYZ_t7LPUGzjOlby8mlkxhet3uzEbIJ/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/194Q0sVH_4E5pQrZcV3iM4A95Tw33XSu9/view?usp=drive_link", board: "SQA National 5 Chemistry" },
        { label: "2023  Paper 2", qpUrl: "https://drive.google.com/file/d/1H_wgPjbX80jzuNtmuHN_jDU6-YCOi3IG/view?usp=drive_link", msUrl: "", board: "SQA National 5 Chemistry" },
      ]
    },
    {
      year: "2022",
      papers: [
        { label: "2022  Paper 1", qpUrl: "https://drive.google.com/file/d/1nYna3YRohTN0E7CxRinEUciGk7Kd-D7e/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1QGyhy_Yp7vYnKdBZc8kGJvB6gW_1g44J/view?usp=drive_link", board: "SQA National 5 Chemistry" },
        { label: "2022  Paper 2", qpUrl: "https://drive.google.com/file/d/1NgWk0AvpI1NxRB9LRmAjox840bdPV2_O/view?usp=drive_link", msUrl: "", board: "SQA National 5 Chemistry" },
      ]
    },
    {
      year: "2019",
      papers: [
        { label: "2019  Paper 1", qpUrl: "https://drive.google.com/file/d/1vpjSHJBxV9MkNB22q_2kc--TFSrhVvc-/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1DlunUtMq--52eAUJuaxO7hCpGlx15VZk/view?usp=drive_link", board: "SQA National 5 Chemistry" },
        { label: "2019  Paper 2", qpUrl: "https://drive.google.com/file/d/1_9lF1RYXTGOH1loW32XEG6rJckxb1Ye0/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1Nx3i9fBSlAQndxARMEQEJyQSjuRdsa0f/view?usp=drive_link", board: "SQA National 5 Chemistry" },
      ]
    },
    {
      year: "2018",
      papers: [
        { label: "2018  Paper 1", qpUrl: "https://drive.google.com/file/d/14qv4iYQepkboYWkNBb2qxmL1h54jADMj/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1AnPoDMVyV8UzGk4Gj1e6X76bfnvg_6ZH/view?usp=drive_link", board: "SQA National 5 Chemistry" },
        { label: "2018  Paper 2", qpUrl: "https://drive.google.com/file/d/1_9lF1RYXTGOH1loW32XEG6rJckxb1Ye0/view?usp=drive_link", msUrl: "https://drive.google.com/file/d/1X4RSf3HwthnQdhqI0gGfjHjogp4e7iJc/view?usp=drive_link", board: "SQA National 5 Chemistry" },
      ]
    }
  ];
  
  const cieOLevelChemPapers = [
    {
    year:"2024",
    papers: [
      { label: "June 2024 Papers 1,2,3,4:", qpUrl: "https://drive.google.com/drive/folders/1GZffinBYCIvYtldyov6i_MA2htBP7kgU?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1O3Yfp_-xiKDHQ7ZZMb2j-LCkupHIDyFl?usp=drive_link", board: "CIE O Level" },
    ]
    },
    {
    year:"2023",
    papers: [
      { label: "June 2023 Papers 1,2,3,4:", qpUrl: "https://drive.google.com/drive/folders/1YPd162UEvVfcuHG5e-_KTYd4pCvfN_rP?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1ame4LE1Wm8NIBcFDr2W2qYrwUABUueNk?usp=drive_link", board: "CIE O Level" },
    ]
    },
    {
      year: "2022",
      papers: [
        { label: "June 2022 Paper 1,2,3,4:", qpUrl: "https://drive.google.com/drive/folders/1UHDi0xJGlUay2J8lI8dZuh4DbB8av3j8?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/114j-1hXCvMXdt9uvO04hZZQXkM3bhqo9?usp=drive_link", board: "CIE O Level Chemistry" },
       
      ]
    },
    {
      year: "2021",
      papers: [
        { label: "October, June, May 2021 Paper 1,2,3,4:", qpUrl: "https://drive.google.com/drive/folders/19Z6gKS3YYjkO8iDQFhhvtEfSj1GURUCw?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/17WB7MEHdKRXynU960EjIAb-UJnxomczN?usp=drive_link", board: "CIE O Level Chemistry" },
        
      ]
    },
    {
      year: "2020",
      papers: [
        { label: "October, June 2020 Paper 1,2,3,4: ", qpUrl: "https://drive.google.com/drive/folders/1p4T6Ow50iptGy8U8AxM_b2DmHh1FmIwn?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1Gde7rkLiUbZwfOi71bwvJJYFT3wsGtVI?usp=drive_link", board: "CIE O Level Chemistry" },

      ]
    },
    {
      year: "2019",
      papers: [
        { label: "October, June 2019 Paper 1,2,3,4: ", qpUrl: "https://drive.google.com/drive/folders/1jHoYFlhkRq698qH8_nsnk3I1SuxDXP4p?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1SlOQo3FXSFu6-pB3gfIO4ai8pVNO8ziN?usp=drive_link", board: "CIE O Level Chemistry" },
      ]
    },
    {
      year: "2018",
      papers: [
        { label: "October, June 2018 Paper 1,2,3,4: ", qpUrl: "https://drive.google.com/drive/folders/1AX-gdMWrt-LL7IImJkQelOY4-uagxjsO?usp=drive_link", msUrl: "https://drive.google.com/drive/folders/1zh6ZPv0E2-3S_qcfERuf_ElnOhE3t3PZ?usp=drive_link", board: "CIE O Level Chemistry" },
       
      ]
    }
  ];
  
  // Combine all boards into a single array for easier management
  const allBoards = [
    { name: "AQA AS Chemistry", data: aqaAsChemPapers },
    { name: "AQA A Level Chemistry", data: aqaALevelChemPapers },
    { name: "CIE AS Chemistry", data: cieAsChemPapers },
    { name: "Edexcel AS Chemistry", data: edexcelAsChemPapers },
    {name: "OCR AS Chemistry", data: ocrAsChemPapers},
    {name: "WJEC AS Chemistry", data: wjecAsChemPapers},
    { name: "CIE A Level Chemistry", data: cieALevelChemPapers },
    {name: "OCR A Level chemistry A", data: ocrALevelChemAPapers},
    { name: "OCR A Level Chemistry B", data: ocrALevelChemBPapers },
    { name: "WJEC A Level Chemistry", data: wjecALevelChemPapers },
    {name : "SQA Advanced Higher Chemistry", data: sqaAdvHigherChemPapers},
    {name : "SQA Higher Chemistry", data: sqaHigherChemPapers},
    {name : "AQA GCSE Chemistry", data: aqaGcseChemPapers},
    { name: "Edexcel A Level Chemistry", data: edexcelALevelChemPapers },
    { name: "Edexcel International AS Chemistry", data: edexcelInternationalASChemPapers },
    { name: "Edexcel GCSE Chemistry", data: edexcelGcseChemPapers },
    { name: "Edexcel IGCSE Chemistry", data: edexcelIgcseChemPapers },
    { name: "Edexcel IGCSE Chemistry (Modular) Unit 1", data: edexcelIgcseChemModularUnit1Papers },
    { name: "Edexcel IGCSE Chemistry (Modular) Unit 2", data: edexcelIgcseChemModularUnit2Papers },
    { name: "Oxford AQA IGCSE Chemistry", data: oxfordAqaIgcseChemPapers },
    { name: "Cambridge CIE IGCSE Chemistry", data: cambridgeCIEIGCSEChemPapers },
    { name: "Edexcel IAL Chemistry", data: edexcelIalChemPapers },
    { name: "WJEC IGCSE Chemistry", data: wjecgcsechemPapers },
    { name: "Oxford AQA IAL Chemistry", data: oxfordAqaIalChemPapers },
    { name: "Edexcel IAS Chemistry", data: edexcelAsChemPapers },
    { name: "Oxford AQA IAS Chemistry", data: oxfordAqaIasChemPapers },
    { name: "SQA National 5 Chemistry", data: sqaNational5ChemPapers },
    { name: "CIE O Level Chemistry", data: cieOLevelChemPapers }
  ];

export { allBoards };

  // Example boardInfo array (customize as needed)
export const boardInfo = [
  {
    id: "ap",
    name: "AP Chemistry",
    description: "College Board AP Chemistry past papers",
    level: "AP",
    papers: apChemPapers,
    color: "#e36414"
  },
  {
    id: "aqa-as",
    name: "AQA AS Chemistry",
    description: "AQA AS Chemistry past papers",
    level: "AS",
    papers: aqaAsChemPapers,
    color: "#e36414"
  },
  {
    id: "cie-as",
    name: "CIE AS Chemistry",
    description: "CIE AS Chemistry past papers",
    level: "AS",
    papers: cieAsChemPapers,
    color: "#e36414"
  },
  {
    id: "edexcel-as",
    name: "Edexcel AS Chemistry",
    description: "Edexcel AS Chemistry past papers",
    level: "AS",
    papers: edexcelAsChemPapers,
    color: "#e36414"
  }
];

// Utility functions
export function getBoardPapers(boardId) {
  const board = boardInfo.find(b => b.id === boardId);
  return board ? board.papers : [];
}

export function getLevels() {
  return [...new Set(boardInfo.map(b => b.level))];
}

export function filterBoardsByLevel(level) {
  return boardInfo.filter(b => b.level === level);
}
  