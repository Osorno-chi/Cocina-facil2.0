const nodemailer = require('nodemailer');
const path = require('path');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD
    }
});

const loadEmailTemplate = (templateName, data) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <header style="background-color: #4CAF50; padding: 20px; text-align: center;">
                <h1 style="color: white;">Cocina Fácil</h1>
            </header>
            <div style="padding: 20px;">
                ${data.content}
            </div>
            <footer style="background-color: #f1f1f1; padding: 20px; text-align: center;">
                <p>Síguenos en nuestras redes sociales</p>
                <div>
                    <a href="#" style="margin: 0 10px;">Facebook</a>
                    <a href="#" style="margin: 0 10px;">Instagram</a>
                    <a href="#" style="margin: 0 10px;">Twitter</a>
                </div>
            </footer>
        </div>
    `;
};

const sendRecipeNotification = async (recipients, recipe) => {
    const htmlContent = loadEmailTemplate('recipe', {
        content: `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" style="max-width: 100%; height: auto;" />
            <p>${recipe.description}</p>
            <a href="${process.env.FRONTEND_URL}/recipes/${recipe._id}" 
               style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
               Ver Receta Completa
            </a>
        `
    });

    transporter.verify((error, success) => {
        if (error) {
            console.error('Email configuration error:', error);
        } else {
            console.log('Email server is ready');
        }
    });

    const mailOptions = {
        from: 'Cocina Fácil <eduardo.osocervantes@gmail.com>',
        to: recipients,
        subject: `Nueva Receta: ${recipe.title}`,
        html: htmlContent,
        attachments: [
            {
                filename: 'logo.png',
                path: path.join(__dirname, '../public/images/logo.png'),
                cid: 'logo'
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Notificación de receta enviada exitosamente');
        return true;
    } catch (error) {
        console.error('Error al enviar la notificación:', error);
        throw error;
    }
};

const sendNewsletterToSubscribers = async (subscribers, content) => {
    const htmlContent = loadEmailTemplate('newsletter', {
        content: `
            <h2>${content.title}</h2>
            <p>${content.description}</p>
            <div style="margin: 20px 0;">
                ${content.recipes.map(recipe => `
                    <div style="margin-bottom: 20px;">
                        <img src="${recipe.image}" style="max-width: 200px; height: auto;" />
                        <h3>${recipe.title}</h3>
                        <p>${recipe.shortDescription}</p>
                    </div>
                `).join('')}
            </div>
        `
    });

    const mailOptions = {
        from: 'Cocina Fácil <eduardo.osocervantes@gmail.com>',
        to: subscribers,
        subject: content.title,
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Newsletter enviado exitosamente');
        return true;
    } catch (error) {
        console.error('Error al enviar newsletter:', error);
        throw error;
    }
};

module.exports = {
    sendRecipeNotification,
    sendNewsletterToSubscribers
};