/*
ProductId: should be between 2 an 20 characters
Name: should be only words
Price: should be from zero to a thousand
Category: should be electronic or organic
*/

function productValidator(product) {
    const errors = [];

    const isProductIdValid = product.id.length >= 2 && product.id <= 20;
    const isProductNameValid = /(\W|\d)/.test(product.name); 
    const isPriceValid = product.price >= 1 && product.price <= 1000;
    const isCategoryValid = ['electronic', 'organic'].includes(product.category)
      
    if (!isProductIdValid) {
        errors.push(`id: invalid length, current [${product.id}] expected to be between 2 an 20`)
    }

    if (isProductNameValid) {
        errors.push(`name: invalid name, current [${product.name}] expected to have only words`)
    }

    if (!isPriceValid) {
        errors.push(`price: invalid price, current[${product.price}] expected to be between 1 and 1000`)
    }

    if (!isCategoryValid) {
        errors.push(`category: invalid category, current[${product.category}] expected to be either electronic or organic`)
    }



    return {
        result: errors.length === 0,
        errors,
    }
}

module.exports = {
    productValidator
}