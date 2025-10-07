"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Banner_route_1 = require("../modules/Banner/Banner.route");
const Package_route_1 = require("../modules/Offer/Package.route");
const judge_route_1 = require("../modules/judgePannel/judge.route");
const timeInstruction_route_1 = require("../modules/timeInstruction/timeInstruction.route");
const faq_route_1 = require("../modules/FqA/faq.route");
const user_route_1 = require("../modules/User/user.route");
const event_route_1 = require("../modules/events/event.route");
const quiz_route_1 = require("../modules/quiz/quiz.route");
const questions_route_1 = require("../modules/questions/questions.route");
const participation_route_1 = require("../modules/Participation/participation.route");
const router = (0, express_1.Router)();
console.log('Loading route modules...');
const moduleRoutes = [
    { path: '/banner', route: Banner_route_1.BannerRoutes },
    { path: '/offers', route: Package_route_1.OfferRouter },
    { path: '/judge', route: judge_route_1.JudgesRouter },
    { path: '/time-instruction', route: timeInstruction_route_1.TimeInstructionRouter },
    { path: '/faq', route: faq_route_1.FaQRouter },
    { path: '/auth', route: user_route_1.UserRoutes },
    { path: '/events', route: event_route_1.EventRouter },
    { path: '/quizzes', route: quiz_route_1.QuizRouter },
    { path: '/questions', route: questions_route_1.QuestionRouter },
    { path: '/participations', route: participation_route_1.ParticipationRouter },
];
moduleRoutes.forEach((route) => {
    try {
        if (!route.route) {
            throw new Error(`Route module for ${route.path} is undefined`);
        }
        router.use(route.path, route.route);
        console.log(`✅ Registered route: /api/v1${route.path}`);
    }
    catch (error) {
        console.error(`Failed to register route /api/v1${route.path}:`, error);
    }
});
exports.default = router;
