import express from 'express';
import { PrismaFeedbackRespository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { NodemailerMailAdapter } from './adapters/nodemaler/nodemailer-mail-adapter';

export const routes = express.Router()

routes.post('/feedbacks', async (request, response) => {
    const { type, comment, screenshot } = request.body;
    
    const prismaFeedbacksRepository = new PrismaFeedbackRespository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    ) 

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })

    return response.status(201).send()
});
