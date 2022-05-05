export type Feedback = {
  id: string;
  type: string;
  comment: string;
  screenshot?: string;
};

export type FeedbackData = Omit<Feedback, 'id'>;

export interface IFeedbacksRepository {
  create(data: FeedbackData): Promise<Feedback>;
}
