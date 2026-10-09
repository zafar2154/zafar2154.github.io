export type EducationItem = {
  title: string;
  subtitle: string;
  years: string;
  /** Extra line, shown only on the highlighted (latest) stage. */
  note?: string;
};

export const education: EducationItem[] = [
  {
    title: 'SDN Batu Ampar 05 Pagi',
    subtitle: '',
    years: '2010 – 2016',
  },
  {
    title: 'SMPN 20 Jakarta',
    subtitle: '',
    years: '2016 – 2019',
  },
  {
    title: 'SMAN 62 Jakarta',
    subtitle: 'Science',
    years: '2019 – 2022',
  },
  {
    title: 'Universitas Pembangunan Nasional Veteran Jakarta',
    subtitle: 'Electrical Engineering',
    years: '2022 – 2026',
    note: 'Focused on IoT, embedded systems, and control, and finished with an undergraduate thesis on a portable IoT water quality monitoring system.',
  },
];
