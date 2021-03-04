-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT p.productName, c.categoryName
FROM product AS p
JOIN category AS c ON p.categoryId = c.Id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT o.id, s.companyName
FROM "Order" AS o 
JOIN shipper AS s ON o.ShipVia = s.id 
WHERE o.orderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT p.ProductName, od.quantity
FROM OrderDetail AS od 
JOIN "order" AS o ON od.OrderId = o.id 
JOIN product AS p ON od.ProductId = p.id 
WHERE o.id = 10251
ORDER BY p.ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT o.id AS OrderId, c.CompanyName as CompanyName, e.LastName AS EmployeeLastName
FROM "Order" AS o 
JOIN Customer AS c ON o.CustomerId = c.id
JOIN Employee AS e ON o.EmployeeId = e.id;