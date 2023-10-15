export type Card = {
  id: string;
  content: string;
  default_flg: 0 | 1;
  highest_score: number;
  participant_count: number;
  user_name: string;
  character_name?: string;
};
