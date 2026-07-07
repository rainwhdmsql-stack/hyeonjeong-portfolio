/* =========================================================
   Project Data
   - 카테고리, 프로젝트 정보, 이미지 경로, 버튼 텍스트/링크를 관리합니다.
   - 프로젝트를 추가하거나 수정할 때는 HTML이 아니라 이 파일을 우선 수정하세요.
   ========================================================= */
const portfolioCategories = [
  {
    id: "uxui",
    title: "UX/UI Design",
    label: "PROCESS BASED",
    description:
      "사용자 흐름과 화면 설계 과정을 중심으로 정리한 프로젝트입니다.",
    thumbnail: "asset/image/project-thumbnail/pickmeal.png",
    cta: "View Process",
    viewer: "ux",
  },
  {
    id: "publishing",
    title: "Web Publishing",
    label: "PUBLISHING",
    description:
      "HTML, CSS, JavaScript 기반으로 구현한 웹 퍼블리싱 작업입니다.",
    thumbnail: "asset/image/project-thumbnail/bisang.png",
    cta: "View Result",
    viewer: "publishing",
  },
  {
    id: "designworks",
    title: "Design Works",
    label: "VISUAL ARCHIVE",
    description:
      "브랜딩, 마케팅, 그래픽 디자인 등 다양한 시각 디자인 작업을 정리한 프로젝트입니다.",
    thumbnail: "asset/image/project-thumbnail/ronron.png",
    cta: "View Gallery",
    viewer: "design",
  },
];

const portfolioProjects = {
  uxui: [
    {
      id: "pickmeal",
      title: "PICK MEAL",
      subtitle: "App Design",
      category: "UX/UI Design",
      tool: "Figma",
      contribution: "100%",
      description:
        "사용자 선택 흐름을 기반으로 음식 추천 경험을 설계한 앱 디자인 프로젝트입니다.",
      thumbnail: "asset/image/project-thumbnail/pickmeal.png",
      hero: "asset/image/project-thumbnail/pickmeal.png",
      processImage: "asset/image/project-desc/pickmeal-desc.png",
      buttons: [
        {
          text: "Prototype",
          url: "https://www.figma.com/proto/EvRGvqrubYzMlQzEAI2dwj/Project-1---Pick-Meal?node-id=42-129&viewport=-29%2C181%2C0.08&t=DeSo1K8s9D8WsN6T-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=42%3A129&show-proto-sidebar=1&page-id=5%3A6",
          type: "link",
        },
      ],
    },
    {
      id: "roomlit",
      title: "RoomLit",
      subtitle: "Brand Website",
      category: "UX/UI Design",
      tool: "Figma | VS Code",
      contribution: "100%",
      description:
        "브랜드 무드와 웹 탐색 흐름을 중심으로 구성한 브랜드 웹사이트 프로젝트입니다.",
      thumbnail: "asset/image/project-thumbnail/roomlit.png",
      hero: "asset/image/project-thumbnail/roomlit.png",
      processImage: "asset/image/project-desc/roomlit-desc.png",
      buttons: [
        {
          text: "Prototype",
          url: "https://www.figma.com/proto/RiDD87vo8RhX4riGG5WjHI/%EC%A1%B0%EB%AA%85-%EB%A0%8C%ED%83%88-%EB%B8%8C%EB%9E%9C%EB%93%9C?node-id=1-2&viewport=-929%2C457%2C0.18&t=MWjzTj5Y7uOWYG3K-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=1%3A2&show-proto-sidebar=1&page-id=0%3A1",
          type: "link",
        },
        {
          text: "Website Preview",
          url: "https://roomlit-responsive-project.vercel.app/",
          type: "link",
        },
      ],
    },
    {
      id: "adobe",
      title: "Adobe",
      subtitle: "Homepage Redesign",
      category: "UX/UI Design",
      tool: "Figma",
      contribution: "40%",
      description:
        "목적 기반 탐색 흐름으로 재구성한 팀 프로젝트형 홈페이지 리디자인입니다.",
      thumbnail: "asset/image/project-thumbnail/Adobe.png",
      hero: "asset/image/project-thumbnail/Adobe.png",
      processImage: "asset/image/project-desc/adobe-desc.png",
      buttons: [
        { text: "Prototype", url: "#", type: "link" },
        {
          text: "Website Preview",
          url: "https://adobe-re.vercel.app/plan.html",
          type: "link",
        },
      ],
    },
    {
      id: "chimac",
      title: "CHIMAC Festival",
      subtitle: "Landing Page",
      category: "UX/UI Design",
      tool: "Figma | Photoshop",
      contribution: "100%",
      description:
        "축제 정보와 이벤트 동선을 빠르게 파악할 수 있도록 설계한 랜딩 페이지입니다.",
      thumbnail: "asset/image/project-thumbnail/chimak-festival.png",
      hero: "asset/image/project-thumbnail/chimak-festival.png",
      processImage: "asset/image/project-desc/chimak-desc.png",
      buttons: [
        {
          text: "Prototype",
          url: "https://www.figma.com/proto/TdGkZ9IREmbhJmB1s1GZjR/%EC%A1%B0%ED%98%84%EC%A0%95-%7C-%EB%8C%80%EA%B5%AC-%EC%B9%98%EB%A7%A5-%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C-%ED%99%8D%EB%B3%B4---%EB%9E%9C%EB%94%A9%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=30-1318&viewport=106%2C267%2C0.05&t=6jNtdgcvqrVq6Z17-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=30%3A1318&page-id=0%3A1",
          type: "link",
        },
      ],
    },
  ],
  publishing: [
    {
      id: "visang",
      title: "VISANG",
      subtitle: "Clone Coding",
      category: "Web Publishing",
      tool: "VSCode",
      contribution: "100%",
      description:
        "웹 구조와 반응형 레이아웃 구현을 학습한 클론 코딩 프로젝트입니다.",
      thumbnail: "asset/image/project-thumbnail/bisang.png",
      hero: "asset/image/project-thumbnail/bisang.png",
      buttons: [
        {
          text: "Website Preview",
          url: "https://visangclone.vercel.app/",
          type: "link",
        },
      ],
    },
  ],
  designworks: [
    {
      id: "itdam",
      title: "잇담",
      subtitle: "Branding Logo Design",
      category: "Design Works",
      tool: "Illustrator | Photoshop",
      contribution: "100%",
      description:
        "브랜드 이름과 시각 이미지를 연결해 로고 시스템을 정리한 브랜딩 작업입니다.",
      thumbnail: "asset/image/project-thumbnail/itdam.png",
      hero: "asset/image/project-thumbnail/itdam.png",
      processImage: "asset/image/project-desc/itdam-desc.png",
    },
    {
      id: "ronron",
      title: "RonRon",
      subtitle: "SNS Feed Design",
      category: "Design Works",
      tool: "Photoshop",
      contribution: "100%",
      description:
        "브랜드 톤과 메시지 전달력을 고려한 SNS 피드 디자인 작업입니다.",
      thumbnail: "asset/image/project-thumbnail/ronron.png",
      hero: "asset/image/project-thumbnail/ronron.png",
      processImage: "asset/image/project-desc/ronron-desc.png",
      
    },
    {
      id: "canon",
      title: "Canon",
      subtitle: "Product Detail Design",
      category: "Design Works",
      tool: "Photoshop | Illustrator",
      contribution: "100%",
      description:
        "제품 정보와 구매 설득 흐름을 시각적으로 정리한 상세페이지 디자인입니다.",
      thumbnail: "asset/image/project-thumbnail/canon.png",
      hero: "asset/image/project-thumbnail/canon.png",
      processImage: "asset/image/project-thumbnail/canon.png",
    },
    {
      id: "arbor",
      title: "ARBOR",
      subtitle: "Thumbnail | Banner Design",
      category: "Design Works",
      tool: "Figma | Photoshop",
      contribution: "100%",
      description:
        "카페24 운영 환경을 고려해 제작한 썸네일과 배너 디자인입니다.",
      thumbnail: "asset/image/project-thumbnail/arbor.png",
      hero: "asset/image/project-thumbnail/arbor.png",
      processImage: "asset/image/project-desc/arbor-desc.png",
      buttons: [
        {
          text: "Cafe24 Preview",
          url: "https://doniee.cafe24.com/",
          type: "link",
        },
      ],
    },
  ],
};
