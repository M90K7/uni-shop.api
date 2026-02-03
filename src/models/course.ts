
export interface ICourse {
  /** آیدی دوره */
  id: number;
  /** عنوان فارسی */
  persianTitle: string;
  /** عنوان انگلیسی */
  englishTitle: string;
  /** دارای زیردسته */
  hasSubCategories: boolean;
  /** تعداد جلسه */
  lectureCount: number | null;
  /** آدرس دوره */
  url: string;
  /** مدرس */
  teacher: User;
  /** رای */
  score: number;
  /** تسلط و دانش مدرس وبینار */
  avgTeacherScore: number;
  /** بروز و کاربری بودن محتوا */
  avgContentScore: number;
  /** قیمت گذاری مناسب نسبت به محتوا */
  avgPriceScore: number;
  /** سرویس دهی و پشتیبانی آن آموز */
  avgSupportScore: number;
  /** تعداد رای */
  scoreCount: number;
  /** توضیحات */
  description: string;
  /** تیزر فیلم دوره */
  teasingPath: string;
  /** تصویر دوره */
  imagePath: string;

  /** مدت زمان دوره بر جسب دقیقه */
  duration: number;
  /** سطح دوره */
  level: CourseLevel;
  /** عنوان سطح دوره */
  levelTitle: string;
  /** قیمت */
  price: number;
  /** قیمت بعد از تخفیف */
  priceAfterDiscount: number;
  /** میزان تخفیف */
  discountAmount: number;
  /** درصد تخفیف */
  discountPercentage: number;
  /** تاریخ انتشار */
  //publishAt: string | null;
  /** تاریخ انتشار شمسی */
  //publishAtFa: string;
  /** تعداد بازدید */
  seenCount: number;
  /** دسته */
  category: Category;
  /** دارای گواهینامه */
  hasCertificate: boolean;
  /** دوره دارای فیلم آپلود شده می باشد */
  hasChapter: boolean;
  /** دارای آزمون */
  hasExam: boolean;
  /** قابل دانلود */
  isDownloadable: boolean;
  /** مخاطبین */
  audience: string;
  /** اطلاعات وبینار */
  webinar: Webinar;
  /** اطلاعات پرداخت */
  coursePaymentDetails: CoursePaymentDetail[];
  /** سرفصل‌ها */
  chapters: CourseChapter[];
  /** کلیدواژه ها */
  keywords: string[];

  courseFiles: CourseFile[];

  /** آیا دروس دارای ویس هست */
  hasVoice?: boolean;
  voiceChapters?: CourseChapter[];

  hasActiveRegistration: boolean;
}