export interface Volunteer {
  id: number;
  name: string;
  email: string;
  status: string;
}

export interface Organizer {
  id: number;
  name: string;
  email: string;
  status: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  start_time: string;
  end_time: string;
  is_free: boolean;
  format: string;
  max_attendees: number;
  volunteers_required: number;
  banner_url: string;
  organizer_id: number;
  volunteers: Volunteer[];
  organizer: Organizer;
  created_at: string;
}

export interface Pass {
  id: number;
  event_id: number;
  user_id: number;
  status: string;
  pass_uid: string;
  event: Event;
  created_at: string;
}
