"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationRouter = void 0;
const express_1 = require("express");
const participation_controller_1 = require("./participation.controller");
const questionUpload_1 = require("../../config/questionUpload");
const ParticipationRouter = (0, express_1.Router)();
exports.ParticipationRouter = ParticipationRouter;
ParticipationRouter.post('/', participation_controller_1.createParticipation);
ParticipationRouter.get('/', participation_controller_1.getParticipations);
ParticipationRouter.get('/:id', participation_controller_1.getParticipationById);
ParticipationRouter.patch('/:id', participation_controller_1.updateParticipation);
ParticipationRouter.delete('/:id', participation_controller_1.deleteParticipation);
ParticipationRouter.get('/quiz/:quizId', participation_controller_1.getParticipationsByQuiz);
ParticipationRouter.post('/check', participation_controller_1.checkParticipation);
// Submit/update a single answer of a participation with optional images
ParticipationRouter.post('/:id/submit-answer', questionUpload_1.questionImageUpload.array('images', 5), participation_controller_1.submitParticipationAnswer);
