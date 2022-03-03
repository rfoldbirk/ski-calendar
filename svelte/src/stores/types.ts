export type Day_dk = "Søndag" | "Mandag" | "Tirsdag" | "Onsdag" | "Torsdag" | "Fredag" | "Lørdag"
export type Day_en = "Sunday" | "Monday" | "Tuesdag" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

export type Lang_Days = {
  "en": string;
  "dk": Day_dk;
}


export type Student = {
  "name": string;
  "age": number;
  "nr": string;
}

export type Lesson = {
  start: string;
  end: string;
  day: Day_dk;
  note?: string;
}

export type Team = {
  title: string;
  week: number;
  teacher: string;
  students: Student[];
  lessons: Lesson[]; 
}

export type TeamLesson = {
  title: string;
  week: number;
  lesson: Lesson;
}