import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // TODO: Add seed data here
    // Insert ProductCategory data
  const categories = [
    'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Toys', 'Beauty', 'Automotive', 'Garden', 'Health'
  ];

  for (const name of categories) {
    await prisma.productCategory.create({
      data: { name }
    });
  }

  // Insert Product data
  const products = [
    {
      name: 'Smartphone',
      description: 'Latest model smartphone with advanced features',
      price: 699.99,
      productCategoryId: 1,
      material: 'Plastic',
      size: 'N/A',
      stylecode: 'SP123',
      sales: 1500.00,
      collection: 'Summer 2024',
      productCode: 'SP12345',
      productClassification: 'Electronics',
      color: 'Black'
    },
    {
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      price: 19.99,
      productCategoryId: 2,
      material: 'Cotton',
      size: 'L',
      stylecode: 'TS456',
      sales: 300.00,
      collection: 'Spring 2024',
      productCode: 'TS45678',
      productClassification: 'Clothing',
      color: 'Blue'
    },
    {
      name: 'Novel',
      description: 'Bestselling fiction novel',
      price: 14.99,
      productCategoryId: 3,
      material: 'Paper',
      size: 'N/A',
      stylecode: 'BK789',
      sales: 500.00,
      collection: 'Winter 2023',
      productCode: 'BK78901',
      productClassification: 'Books',
      color: 'N/A'
    },
    {
      name: 'Blender',
      description: 'High-speed kitchen blender',
      price: 49.99,
      productCategoryId: 4,
      material: 'Metal',
      size: 'N/A',
      stylecode: 'HK012',
      sales: 200.00,
      collection: 'Fall 2023',
      productCode: 'HK01234',
      productClassification: 'Home & Kitchen',
      color: 'Silver'
    },
    {
      name: 'Basketball',
      description: 'Official size basketball',
      price: 29.99,
      productCategoryId: 5,
      material: 'Rubber',
      size: 'N/A',
      stylecode: 'SP345',
      sales: 100.00,
      collection: 'Summer 2024',
      productCode: 'SP34567',
      productClassification: 'Sports',
      color: 'Orange'
    },
    {
      name: 'Action Figure',
      description: 'Popular superhero action figure',
      price: 24.99,
      productCategoryId: 6,
      material: 'Plastic',
      size: 'N/A',
      stylecode: 'TY678',
      sales: 150.00,
      collection: 'Spring 2024',
      productCode: 'TY67890',
      productClassification: 'Toys',
      color: 'Red'
    },
    {
      name: 'Lipstick',
      description: 'Long-lasting matte lipstick',
      price: 9.99,
      productCategoryId: 7,
      material: 'Wax',
      size: 'N/A',
      stylecode: 'BT901',
      sales: 250.00,
      collection: 'Winter 2023',
      productCode: 'BT90123',
      productClassification: 'Beauty',
      color: 'Pink'
    },
    {
      name: 'Car Wax',
      description: 'Premium car wax for a shiny finish',
      price: 19.99,
      productCategoryId: 8,
      material: 'Wax',
      size: 'N/A',
      stylecode: 'AU234',
      sales: 75.00,
      collection: 'Fall 2023',
      productCode: 'AU23456',
      productClassification: 'Automotive',
      color: 'Yellow'
    },
    {
      name: 'Garden Hose',
      description: 'Durable garden hose',
      price: 34.99,
      productCategoryId: 9,
      material: 'Rubber',
      size: 'N/A',
      stylecode: 'GD567',
      sales: 50.00,
      collection: 'Summer 2024',
      productCode: 'GD56789',
      productClassification: 'Garden',
      color: 'Green'
    },
    {
      name: 'Vitamins',
      description: 'Daily multivitamin supplement',
      price: 12.99,
      productCategoryId: 10,
      material: 'N/A',
      size: 'N/A',
      stylecode: 'HL890',
      sales: 300.00,
      collection: 'Spring 2024',
      productCode: 'HL89012',
      productClassification: 'Health',
      color: 'N/A'
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  // Insert ProductImage data
  const images = [
    { productId: 1, url: 'http://example.com/images/smartphone1.jpg' },
    { productId: 1, url: 'http://example.com/images/smartphone2.jpg' },
    { productId: 2, url: 'http://example.com/images/tshirt1.jpg' },
    { productId: 2, url: 'http://example.com/images/tshirt2.jpg' },
    { productId: 3, url: 'http://example.com/images/novel1.jpg' },
    { productId: 4, url: 'http://example.com/images/blender1.jpg' },
    { productId: 5, url: 'http://example.com/images/basketball1.jpg' },
    { productId: 6, url: 'http://example.com/images/actionfigure1.jpg' },
    { productId: 7, url: 'http://example.com/images/lipstick1.jpg' },
    { productId: 8, url: 'http://example.com/images/carwax1.jpg' },
    { productId: 9, url: 'http://example.com/images/gardenhose1.jpg' },
    { productId: 10, url: 'http://example.com/images/vitamins1.jpg' }
  ];

  for (const image of images) {
    await prisma.productImage.create({
      data: image
    });
  }
}

main()
    .then(() => console.log('Data seeded'))
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
