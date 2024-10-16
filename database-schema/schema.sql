-- Table for storing application data
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userType ENUM('student', 'staff'),
    surname VARCHAR(255) NOT NULL,
    otherNames VARCHAR(255) NOT NULL,
    idNumber VARCHAR(50) NOT NULL,
    level VARCHAR(50),
    department VARCHAR(100),
    faculty VARCHAR(100),
    hostel VARCHAR(100),
    designation VARCHAR(100),
    passportPhotoPath VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing payment information
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    applicationId INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    paymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paymentStatus ENUM('pending', 'successful', 'failed') DEFAULT 'pending',
    remitaReceiptPath VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (applicationId) REFERENCES applications(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    userType ENUM('student', 'staff', 'admin') NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('application', 'replacement', 'upgrade') NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    payment_status ENUM('pending', 'successful', 'unsuccessful') DEFAULT 'pending',
    verified_at TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests(id)
);
