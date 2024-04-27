import types from "../utils/returnTypes.js";
import { get, create, save, deleteSingleProduct, getProductDetail, searchProductByName, searchProduct } from "./service.js";
import { anyFieldEmpty } from "../utils/dry.js";

export async function list(connection, req) {
  const searchText = req.params["searchText"] || "";
  const page = req.params["page"] || 0;

  const {products, totalCount} = await get(connection, searchText, page);
  if (!products) {
    return {
      message: {
        text: 'Error occurred while retrieving product(s)',
        type: types.ERROR
      }
    }
  }
    
  return {
    products,
    totalCount,
    message: {
      text: 'Product(s) retrieved',
      type: types.SUCCESS
    }
  }
}

export async function search(connection, req) {
  const searchText = req.params["searchText"] || "";

  const {products, totalCount} = await searchProduct(connection, searchText);
  if (!products) {
    return {
      message: {
        text: 'Error occurred while retrieving product(s)',
        type: types.ERROR
      }
    }
  }
    
  return {
    products,
    totalCount,
    message: {
      text: 'Product(s) retrieved',
      type: types.SUCCESS
    }
  }
}

export async function insert(connection, formData) {
  // validate form fields values
  const requiredFields = {
    name: formData['name'],
    quantity: formData['quantity'],
    min_quantity: formData['min_quantity'],
    section_id: formData['section_id'],
    category_id: formData['category_id'],
    expiry_date: formData['expiry_date'],
    price: formData['price'],
  };

  if (anyFieldEmpty(requiredFields)) {
    return {
      message: {
        text: 'Please fill all required fields',
        type: types.ERROR
      }
    }
  }

  let result = await create(connection, formData);
  if (!result) {
    return {
      message: {
        text: 'Error occurred while creating product',
        type: types.ERROR
      }
    }
  }
  return {
    result,
    message: {
      text: 'Product created successfully',
      type: types.SUCCESS
    }
  } 
}

export async function update(connection, formData) {
  // validate form fields values
  const requiredFields = {
    name: formData['name'],
    quantity: formData['quantity'],
    min_quantity: formData['min_quantity'],
    section_id: formData['section_id'],
    category_id: formData['category_id'],
    expiry_date: formData['expiry_date'],
    price: formData['price'],
  };

  if (anyFieldEmpty(requiredFields)) {
    return {
      message: {
        text: 'Please fill all required fields',
        type: types.ERROR
      }
    }
  }

  let result = await save(connection, formData);
  if (!result) {
    return {
      message: {
        text: 'Error occurred while updating product',
        type: types.ERROR
      }
    }
  }
  return {
    result,
    message: {
      text: 'Product updated successfully',
      type: types.SUCCESS
    }
  }
}

export async function deleteProduct(connection, req) {
  const productId = req.params['id'];

  let result = await deleteSingleProduct(connection, productId);
  if (!result) {
    return {
      message: {
        text: 'Error occurred while deleting product',
        type: types.ERROR
      }
    }
  }

  return {
    result,
    message: {
      text: 'Product deleted successfully',
      type: types.SUCCESS
    }
  }
}

export async function getProduct(connection, req) {
  const productId = req.params['id'];

  if (!productId) {
    return {
      message: {
        text: 'Error occurred while deleting product',
        type: types.ERROR
      }
    }
  }

  let result = await getProductDetail(connection, productId);
  if (!result) {
    return {
      message: {
        text: 'Error occurred while deleting product',
        type: types.ERROR
      }
    }
  }

  return {
    product: result,
    message: {
      text: 'Product details retrieved',
      type: types.SUCCESS
    }
  }
}

export async function getProductByName(connection, req) {
  let result = await searchProductByName(connection, req.params["name"]);
  if (result && !result.count) {
    return {};
  }

  return {
    duplicateCount: result.count,
    products: result.products,
    message: {
      text: 'Found few similar name product(s)',
      type: types.INFO
    }
  }
}