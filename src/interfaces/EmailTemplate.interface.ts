export interface EmailTemplateInterface {
    id: string; // Unique identifier for the email template
    name: string; // Name of the email template
    subject: string; // Subject of the email
    body: string; // Body content of the email
    placeholders: string[]; // Array of placeholders used in the template
    createdAt: Date; // Timestamp when the template was created
  }
  