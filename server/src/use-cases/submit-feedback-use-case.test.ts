import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        // Expects to run the function without throwing errors
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example',
            screenshot: 'data:image/png;base64,21378et1287egdeqwd7812te7812ge8ydqw',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without type', async () => {
        // Expects to reject the function 'cause it's not passing the type
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example',
            screenshot: 'data:image/png;base64,21378et1287egdeqwd7812te7812ge8ydqw',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comment', async () => {
        // Expects to reject the function 'cause it's not passing the comment
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,21378et1287egdeqwd7812te7812ge8ydqw',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        // Expects to reject the function 'cause it's passing an invalid screenshot format
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Tá tudo bugado!',
            screenshot: 'test.png',
        })).rejects.toThrow();
    });
});