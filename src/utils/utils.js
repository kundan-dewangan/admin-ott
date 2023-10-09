// Generate a random 5-digit number
export function generateRandom5DigitNumber() {
    const min = 10000; // Minimum 5-digit number (inclusive)
    const max = 99999; // Maximum 5-digit number (inclusive)

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const loginCred = {
    email: 'kundan@gmail.com',
    password: 'Kundan@1234'
}