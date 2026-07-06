const portfolioCategories = [
  {
    id: 'uxui',
    title: 'UX/UI Design',
    label: 'PROCESS BASED',
    description: '사용자 흐름과 화면 설계 과정을 중심으로 정리한 프로젝트입니다.',
    thumbnail: 'asset/image/project/app_design.png',
    cta: 'View Process',
    viewer: 'ux'
  },
  {
    id: 'publishing',
    title: 'Web Publishing',
    label: 'PUBLISHING',
    description: 'HTML, CSS, JavaScript 기반으로 구현한 웹 퍼블리싱 작업입니다.',
    thumbnail: 'asset/image/project/bisang_clonecoding.png',
    cta: 'View Result',
    viewer: 'publishing'
  },
  {
    id: 'designworks',
    title: 'Design Works',
    label: 'VISUAL ARCHIVE',
    description: '브랜딩, 마케팅, 그래픽 작업을 결과물 중심으로 모아둔 갤러리입니다.',
    thumbnail: 'asset/image/project/branding_design.png',
    cta: 'View Gallery',
    viewer: 'design'
  }
];

const portfolioProjects = {
  uxui: [
    {
      id: 'pickmeal',
      title: 'PICK MEAL',
      subtitle: 'App Design',
      category: 'UX/UI Design',
      tool: 'Figma',
      contribution: '100%',
      description: '사용자 선택 흐름을 기반으로 음식 추천 경험을 설계한 앱 디자인 프로젝트입니다.',
      thumbnail: 'asset/image/project/app_design.png',
      hero: 'asset/image/project/app_design.png',
      processImage: 'asset/image/project/app_design.png',
      buttons: [
        { text: 'Prototype', url: '#', type: 'link' },
        { text: 'Final Design', url: '#', type: 'link' }
      ]
    },
    {
      id: 'roomlit',
      title: 'RoomLit',
      subtitle: 'Brand Website',
      category: 'UX/UI Design',
      tool: 'Figma / VS Code',
      contribution: '100%',
      description: '브랜드 무드와 웹 탐색 흐름을 중심으로 구성한 브랜드 웹사이트 프로젝트입니다.',
      thumbnail: 'asset/image/project/roomlit_brandsite.png',
      hero: 'asset/image/project/roomlit_brandsite.png',
      processImage: 'asset/image/project/roomlit_brandsite.png',
      buttons: [
        { text: 'Prototype', url: '#', type: 'link' },
        { text: 'Website Preview', url: '#', type: 'link' }
      ]
    },
    {
      id: 'adobe',
      title: 'Adobe',
      subtitle: 'Homepage Redesign',
      category: 'UX/UI Design',
      tool: 'Figma',
      contribution: '40%',
      description: '목적 기반 탐색 흐름으로 재구성한 팀 프로젝트형 홈페이지 리디자인입니다.',
      thumbnail: 'asset/image/project/teamproject.png',
      hero: 'asset/image/project/teamproject.png',
      processImage: 'asset/image/project/teamproject.png',
      buttons: [
        { text: 'Prototype', url: '#', type: 'link' },
        { text: 'Team Result', url: '#', type: 'link' }
      ]
    },
    {
      id: 'chimac',
      title: 'CHIMAC Festival',
      subtitle: 'Landing Page',
      category: 'UX/UI Design',
      tool: 'Figma',
      contribution: '100%',
      description: '축제 정보와 이벤트 동선을 빠르게 파악할 수 있도록 설계한 랜딩 페이지입니다.',
      thumbnail: 'asset/image/project/chimack_design.png',
      hero: 'asset/image/project/chimack_design.png',
      processImage: 'asset/image/project/chimack_design.png',
      buttons: [
        { text: 'Prototype', url: '#', type: 'link' },
        { text: 'Landing Preview', url: '#', type: 'link' }
      ]
    }
  ],
  publishing: [
    {
      id: 'bisang',
      title: 'BISANG',
      subtitle: 'Clone Coding',
      category: 'Web Publishing',
      tool: 'VS Code',
      contribution: '100%',
      description: '웹 구조와 반응형 레이아웃 구현을 학습한 클론 코딩 프로젝트입니다.',
      thumbnail: 'asset/image/project/bisang_clonecoding.png',
      hero: 'asset/image/project/bisang_clonecoding.png',
      buttons: [
        { text: 'Live Preview', url: '#', type: 'link' },
        { text: 'Code View', url: '#', type: 'link' }
      ]
    }
  ],
  designworks: [
    {
      id: 'itdam',
      title: '잇담',
      subtitle: 'Branding Logo Design',
      category: 'Design Works',
      tool: 'Illustrator / Photoshop',
      contribution: '100%',
      description: '브랜드 이름과 시각 이미지를 연결해 로고 시스템을 정리한 브랜딩 작업입니다.',
      thumbnail: 'asset/image/project/branding_design.png',
      hero: 'asset/image/project/branding_design.png',
      processImage: 'asset/image/project/branding_design.png',
      buttons: [
        { text: 'Brand Guide', url: '#', type: 'link' },
        { text: 'Logo System', url: '#', type: 'link' }
      ]
    },
    {
      id: 'ronron',
      title: 'RonRon',
      subtitle: 'SNS Feed Design',
      category: 'Design Works',
      tool: 'Photoshop',
      contribution: '100%',
      description: '브랜드 톤과 메시지 전달력을 고려한 SNS 피드 디자인 작업입니다.',
      thumbnail: 'asset/image/project/sns_design.jpg',
      hero: 'asset/image/project/sns_design.jpg',
      buttons: [
        { text: 'Feed Preview', url: '#', type: 'link' },
        { text: 'Full View', url: '#', type: 'link' }
      ]
    },
    {
      id: 'canon',
      title: 'Canon',
      subtitle: 'Product Detail Design',
      category: 'Design Works',
      tool: 'Photoshop / Illustrator',
      contribution: '100%',
      description: '제품 정보와 구매 설득 흐름을 시각적으로 정리한 상세페이지 디자인입니다.',
      thumbnail: 'asset/image/project/detailpage_design.png',
      hero: 'asset/image/project/detailpage_design.png',
      buttons: [
        { text: 'Detail Page', url: '#', type: 'link' },
        { text: 'Full View', url: '#', type: 'link' }
      ]
    },
    {
      id: 'arbor',
      title: 'ARBOR',
      subtitle: 'Thumbnail / Banner Design',
      category: 'Design Works',
      tool: 'Figma',
      contribution: '100%',
      description: '카페24 운영 환경을 고려해 제작한 썸네일과 배너 중심의 디자인 작업입니다.',
      thumbnail: 'asset/image/project/cafe24_design.png',
      hero: 'asset/image/project/cafe24_design.png',
      buttons: [
        { text: 'Thumbnail', url: '#', type: 'link' },
        { text: 'Banner', url: '#', type: 'link' }
      ]
    }
  ]
};
