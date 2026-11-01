export type ProjectStory = {
  /** What needed solving. */
  problem: string;
  /** What was built and how. */
  approach: string;
  /** What came out of it. */
  outcome: string;
};

export type Project = {
  id: string;
  title: string;
  /** Short line under the title, e.g. the competition or course it came from. */
  context: string;
  description: string;
  image: string;
  /** Source repository, or "#" when it isn't published. */
  link: string;
  /** Live site, for projects that are deployed. Optional. */
  live?: string;
  tags: string[];
  badge?: string;
  /** The short Problem → Approach → Outcome story shown on the card. */
  story: ProjectStory;
  /** Bullet points shown in the detail view when the card is clicked. Optional. */
  highlights?: string[];
};

/**
 * Edit this list to add, remove, or update projects. The order here is the
 * order of the cards, left to right, in the horizontal scroll section.
 *
 * `story` is the short narrative on each card; `description` and
 * `highlights` are shown in the detail view when a card is clicked.
 */
export const projects: Project[] = [
  {
    id: 'water-quality-monitoring',
    title: 'Portable Water Quality Monitor',
    context: 'Undergraduate thesis',
    description:
      'A portable, IoT-based system for monitoring drinking water quality on the spot. The ESP32 device measures turbidity, pH, TDS, air temperature, and water temperature, assesses overall quality with Fuzzy Mamdani logic at 95.83% accuracy, and attaches GPS coordinates to every reading so results can be mapped by location. It comes with an Android app, and the thesis is published in the UPNVJ repository.',
    image: 'img/project-water.svg',
    link: 'https://github.com/zafar2154/water-quality-system',
    tags: ['IoT', 'Fuzzy Mamdani', 'ESP32', 'Android', 'GPS Mapping'],
    badge: 'Undergraduate Thesis',
    story: {
      problem:
        'Checking drinking water quality usually means lab tests: slow, and tied to one place.',
      approach:
        'I built a portable ESP32 device that reads water parameters on-site, rates quality with Fuzzy Mamdani logic, and tags each reading with GPS coordinates.',
      outcome:
        'Quality ratings reached 95.83% accuracy, and readings can be mapped to compare water quality across places.',
    },
    highlights: [
      'Portable ESP32 hardware that measures turbidity, pH, TDS, air temperature, and water temperature at the source.',
      'Fuzzy Mamdani inference turns the sensor readings into one quality rating, with 95.83% accuracy.',
      'GPS-tagged readings enable spatial mapping of water quality.',
      'Android companion app built with Kotlin and Jetpack Compose.',
      'Enclosure designed in Fusion 360 and 3D-printed.',
    ],
  },
  {
    id: 'asv',
    title: 'Autonomous Surface Vessel',
    context: 'KKI ASV 2024',
    description:
      'Developed an autonomous surface vessel built on NVIDIA Jetson Nano and Arduino controllers. A camera running YOLO and OpenCV handles computer vision, while a Pixhawk and an HC-SR04 ultrasonic sensor handle navigation and obstacle avoidance. A PHP web-based monitoring system tracks the vessel. The project required multidisciplinary integration of mechanical, electrical, embedded, control, and software systems.',
    image: 'img/kki.webp',
    link: 'https://github.com/zafar2154/kki-computer-vision',
    tags: ['Computer Vision', 'YOLO', 'Jetson Nano', 'Web Development'],
    badge: '🏆 Finalist — KKI ASV 2024',
    story: {
      problem:
        'KKI ASV 2024 needed a boat that runs itself, with no one at the helm.',
      approach:
        'I integrated a Jetson Nano, Arduino, Pixhawk, camera, and ultrasonic sensor so the vessel can see, avoid obstacles, and drive itself.',
      outcome:
        'A vessel that steers and controls itself, much like a self-driving car, and took the team to the final.',
    },
    highlights: [
      'Built on NVIDIA Jetson Nano and Arduino controllers.',
      'Implemented YOLO and OpenCV for computer vision.',
      'Integrated a camera, Pixhawk, and HC-SR04 ultrasonic sensor for navigation and obstacle avoidance.',
      'Built a PHP web-based monitoring system.',
      'Required multidisciplinary integration across mechanical, electrical, embedded, control, and software systems.',
    ],
  },
  {
    id: 'educational-website',
    title: 'Educational Website for Senior High School',
    context: 'Web platform for senior high school',
    description:
      'A free web platform that gives students one place to study: 360+ books, 210+ exam question sets with answers, and 10 interactive simulations.',
    image: 'img/project-education.webp',
    link: 'https://github.com/zafar2154/electro-education',
    live: 'https://depok.yukbelajar.online/',
    tags: ['React', 'TypeScript', 'Web Development', 'Education'],
    story: {
      problem:
        'Senior high school students needed one place to find books, exam practice, and lab simulations.',
      approach:
        'I developed a platform with a book library, a question bank with answers, and a virtual lab.',
      outcome:
        'A live, free site with 360+ books, 210+ question sets, and 10 simulations.',
    },
    highlights: [
      'Book library with 360+ books.',
      'Question bank with 210+ exam question sets and their answers.',
      'Virtual lab with 10 interactive simulations.',
    ],
  },
  {
    id: 'lexicon-sentiment',
    title: 'Lexicon-Based Sentiment Analysis',
    context: 'DBS Foundation bootcamp',
    description:
      'A sentiment analysis project built on about 50,000 YouTube app reviews scraped from Google Play. A sentiment lexicon labels each review as positive, neutral, or negative, and those labels are used to train and compare three deep learning models.',
    image: 'img/project-sentiment.svg',
    link: 'https://github.com/zafar2154/lexicon-based-analisis-sentiment',
    tags: ['NLP', 'Machine Learning', 'TensorFlow', 'Python'],
    story: {
      problem:
        'A DBS Foundation bootcamp project: sort thousands of app reviews by sentiment without labeling them by hand.',
      approach:
        'I scraped about 50,000 Google Play reviews, labeled them with a sentiment lexicon, and compared Word2Vec + LSTM, GloVe + CNN, and TF-IDF + GRU.',
      outcome:
        'TF-IDF + GRU came out on top, with 95.7% test accuracy against the lexicon labels.',
    },
    highlights: [
      'Scraped and preprocessed about 50,000 YouTube reviews from Google Play.',
      'Labeled reviews as positive, neutral, or negative with a sentiment lexicon.',
      'Compared three models on the lexicon labels: Word2Vec + LSTM (92.7%), GloVe + CNN (93.1%), and TF-IDF + GRU (95.7%).',
    ],
  },
  {
    id: 'tennis-tournament',
    title: 'Tennis Tournament Website',
    context: 'Baseline Tennis Club — Frontend developer',
    description:
      'The website for Baseline Tennis Club, with tournaments at its core. Visitors can explore the club, check coaching schedules, and follow events and winners, while operators run tournaments from their own panel. I worked on it as the frontend developer, as part of a team.',
    image: 'img/project-tennis.webp',
    link: 'https://github.com/pratamaridho/web-tennis',
    live: 'https://baseline.riverasolutions.id/',
    tags: ['React', 'TypeScript', 'GSAP', 'Frontend'],
    story: {
      problem:
        'A tennis club wanted a website that does more than show club info: it should run tournaments too.',
      approach:
        'As the frontend developer, I built the public site and the operator panel for events, draws, and schedules with React and TanStack.',
      outcome:
        'A live club site that carries real tournaments, such as Baseline Open 2026.',
    },
    highlights: [
      'Set up the frontend foundation with React, TypeScript, TanStack Router, and TanStack Query.',
      'Built operator tools for players, teams, events, categories, pools, draws, and schedules, plus a live operator panel.',
      'Worked on the company profile and CMS, and redesigned the homepage from Figma with GSAP animation.',
    ],
  },
  {
    id: 'rock-paper-scissors',
    title: 'Rock Paper Scissors Detector',
    context: 'DBS Foundation bootcamp',
    description:
      'A Convolutional Neural Network model that classifies images of rock, paper, and scissors hand gestures, trained with data augmentation and transfer learning to 98% test accuracy. Built as a project in the DBS Foundation bootcamp.',
    image: 'img/project-rps.jpg',
    link: 'https://github.com/zafar2154/rock_paper_scissors_detection/blob/main/rockpaperscissor_detection.ipynb',
    tags: ['Machine Learning', 'CNN', 'Transfer Learning', 'Python'],
    story: {
      problem:
        'A bootcamp project from DBS Foundation: teach a model to tell hand shapes apart.',
      approach:
        'I trained a CNN image classifier with data augmentation and transfer learning, using TensorFlow and Keras on Google Colab.',
      outcome:
        'A trained model that recognizes the gesture in new hand images, with 98% test accuracy.',
    },
    highlights: [
      'Preprocessed and augmented a labeled image dataset of rock, paper, and scissors hand gestures.',
      'Trained a CNN with transfer learning using TensorFlow and Keras on Google Colab.',
      'Reached 98% test accuracy.',
    ],
  },
  {
    id: 'vacuum-cleaner',
    title: 'Simple Automatic Vacuum Cleaner',
    context: 'Fuzzy logic control',
    description:
      'Arduino-based vacuum cleaner using fuzzy logic: it switches on by itself and sets its suction power from the humidity, the amount of dust, and the distance to the nearest object. I led the project from planning to execution.',
    image: 'img/project-vacuum.jpg',
    link: 'https://github.com/zafar2154/Automatic-Vacuum-Cleaner',
    tags: ['Arduino', 'Fuzzy Logic', 'Control System'],
    story: {
      problem:
        'Ordinary vacuum cleaners are either on or off, with no sense of how dirty the floor is.',
      approach:
        'I wrote the control logic on Arduino with fuzzy logic. It takes humidity, the amount of dust, and the distance to the nearest object, and turns them into a suction level.',
      outcome:
        'A vacuum that switches on by itself and scales its suction power to the conditions.',
    },
    highlights: [
      'Programmed on Arduino using fuzzy logic control instead of simple on/off thresholds.',
      'Used DHT11 and HC-SR04 sensors, and led the work from planning through programming and hardware assembly.',
      'Suction power scales with humidity, dust level, and obstacle distance.',
      'Switches on automatically, reducing manual operation.',
    ],
  },
  {
    id: 'pcb-running-led',
    title: 'PCB Running LED',
    context: 'My first PCB design — group project',
    description:
      'A 10-LED running-light circuit driven by an NE555 timer and a 4017 decade counter, designed and etched as a custom PCB, laid out in Eagle. It was a group project, and my first time making a PCB.',
    image: 'img/project-pcb-board.svg',
    link: '#',
    tags: ['PCB Design', 'Eagle', 'NE555', 'Electronics'],
    story: {
      problem:
        'My first PCB: a small circuit to learn the whole path from schematic to a real board.',
      approach:
        'An NE555 clocks a 4017 counter that lights ten LEDs one after another. We laid it out in Eagle, then etched and assembled it by hand.',
      outcome:
        'A working board with ten LEDs running in sequence.',
    },
    highlights: [
      'Laid out the board in Eagle, with all traces routed on a single copper layer.',
      'NE555 timer clocks a 4017 decade counter, with a trimmer in the timing circuit.',
      'Etched and hand-assembled the 10-LED sequential lighting circuit.',
      'Focused on trace routing and component placement fundamentals.',
    ],
  },
];
