import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Company Management API',
      version: '1.0.0',
      description: 'API cho TÂM LUXURY',
      contact: {
        name: 'Admin',
        email: 'admin@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000', // Thay đổi URL nếu cần
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Định nghĩa Bearer token cho Swagger
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Áp dụng Bearer token cho tất cả các endpoint mặc định
      },
    ],
  },
  apis: ['./src/routes/admin/*.js'], // Chỉ định vị trí các route để Swagger quét
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

export default swaggerSpecs;
