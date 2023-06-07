export interface UserPayload {
    userId: string;
  }
  
  declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }