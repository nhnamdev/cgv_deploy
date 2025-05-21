module.exports = {
    apps: [
      {
        name: 'BOOKING-CGV-BACKEND',         // Tên ứng dụng
        script: './index.js',                // File chạy chính của backend (sửa lại nếu bạn dùng file khác)
        env: {
          NODE_ENV: 'production',
          PORT: 7000,                        // Port backend của bạn
          DB_HOST: '163.223.225.129',              // Thay bằng host DB thực tế nếu cần
          DB_USER: 'root',           // Thay bằng user DB thực tế
          DB_PASSWORD: '12345',   // Thay bằng password DB thực tế
          DB_NAME: 'movie_ticket_booking_website',            // Thay bằng tên DB thực tế
        },
      },
    // Frontend (chạy server tĩnh bằng serve)
    {
      name: 'BOOKING-CGV-FRONTEND',
      script: 'npx',
      args: 'serve -s dist -l 3000', // Chạy thư mục build ở port 3000
      cwd: './frontend',             // Thư mục làm việc cho frontend
      env: {
        NODE_ENV: 'production',
        VITE_API_URL: 'http://163.223.225.129:7000',
      },
      watch: false,
    },
  ],
};