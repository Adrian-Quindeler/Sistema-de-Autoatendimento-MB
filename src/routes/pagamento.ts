import { Router, Request, Response } from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const pagamentoRouter: Router = Router();

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || 'SUA_CHAVE_AQUI',
});

const preference = new Preference(client);

pagamentoRouter.post('/criar-preferencia', async (req: Request, res: Response): Promise<void> => {
    const cart = req.body.cart;

    if (!cart) {
        res.status(400).json({ error: 'Carrinho vazio.' });
        return;
    }

    try {
        const items = Object.entries(cart).map(([name, { price, quantity }]: any) => ({
            id: name,
            title: name,
            unit_price: parseFloat(price),
            quantity,
        }));

        const result = await preference.create({
            body: {
                items,
                back_urls: {
                    success: 'http://localhost:3000/html/tela_pagamento.html?status=success',
                    failure: 'http://localhost:3000/html/tela_pagamento.html?status=failure',
                    pending: 'http://localhost:3000/html/tela_pagamento.html?status=pending',
                },
                auto_return: 'approved',
            },
        });

        res.json({ init_point: result.init_point });
    } catch (error) {
        console.error('Erro ao criar preferência:', error);
        res.status(500).json({ error: 'Erro ao processar pagamento.' });
    }
});

export default pagamentoRouter;
