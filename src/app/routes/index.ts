import { Router } from 'express';
import { BannerRoutes } from '../modules/Banner/Banner.route';
import { OfferRouter } from '../modules/Offer/Package.route';
import { JudgesRouter } from '../modules/judgePannel/judge.route';
import { TimeInstructionRouter } from '../modules/timeInstruction/timeInstruction.route';
import { FaQRouter } from '../modules/FqA/faq.route';
import { UserRoutes } from '../modules/User/user.route';
import { EventRouter } from '../modules/events/event.route';
import { QuizRouter } from '../modules/quiz/quiz.route';
import { QuestionRouter } from '../modules/questions/questions.route';
import { ParticipationRouter } from '../modules/Participation/participation.route';

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();
console.log('Loading route modules...');

const moduleRoutes: TModuleRoutes[] = [
  { path: '/banner', route: BannerRoutes },
  { path: '/offers', route: OfferRouter },
  { path: '/judge', route: JudgesRouter },
  { path: '/time-instruction', route: TimeInstructionRouter },
  { path: '/faq', route: FaQRouter },
  { path: '/auth', route: UserRoutes },

  { path: '/events', route: EventRouter },
  { path: '/quizzes', route: QuizRouter },
  { path: '/questions', route: QuestionRouter },
  { path: '/participations', route: ParticipationRouter },
];

moduleRoutes.forEach((route) => {
  try {
    if (!route.route) {
      throw new Error(`Route module for ${route.path} is undefined`);
    }
    router.use(route.path, route.route);
    console.log(`✅ Registered route: /api/v1${route.path}`);
  } catch (error) {
    console.error(`Failed to register route /api/v1${route.path}:`, error);
  }
});

export default router;
