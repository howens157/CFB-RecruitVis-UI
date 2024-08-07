export function getCurrentRecruitingYear(): number {
  const currentYear = (new Date().getFullYear())+1;
  return currentYear;
}
