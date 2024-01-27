export class ZoomMeetingRecurrence{
  end_date_time: Date;
  end_times: number;
  monthly_day: number;
  monthly_week: number;
  monthly_week_day: number;
  repeat_interval: number;
  type:number = 1; //1: Diario | 2: Semanal | 3: Mensual
  weekly_days: string; // Días de la semana separados por coma (1: Domingo, 2: Lunes, ...7: Sbado)
}
