import React, { useState } from "react";
import {
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
  Page,
} from "@shopify/polaris";
import { observer } from "mobx-react-lite";
import product from "../../store";

const ProductForm = observer(() => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!product.title.trim()) {
      setErrorMessage("Title is required");
      return;
    }
    if (!product.price.trim()) {
      setErrorMessage("Price is required");
      return;
    }
    if (!product.stockQuantity.trim()) {
      setErrorMessage("Stock quantity is required");
      return;
    }
    if (!product.description.trim()) {
      setErrorMessage("Description is required");
      return;
    }

    // Store message
    const resultMessage = await product.submitForm();
    if (resultMessage.includes("Failed")) {
      setErrorMessage(resultMessage);
    } else {
      alert(resultMessage);
      resetForm();
    }
  };

  // Reset form
  const resetForm = () => {
    product.setTitle("");
    product.setPrice("");
    product.setStockQuantity("");
    product.setDescription("");
    setErrorMessage("");
  };

  return (
    <Page title="Create Product">
      <Card sectioned>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              label="Title"
              value={product.title}
              onChange={(value) => product.setTitle(value)}
            />

            <TextField
              label="Price"
              type="number"
              value={product.price}
              onChange={(value) => {
                product.setPrice(value);
              }}
            />

            <TextField
              label="Stock Quantity"
              type="number"
              value={product.stockQuantity}
              onChange={(value) => {
                product.setStockQuantity(value);
              }}
            />

            <TextField
              label="Description"
              multiline
              value={product.description}
              onChange={(value) => {
                product.setDescription(value);
              }}
            />

            <div style={{ display: "flex", marginTop: "10px" }}>
              <div>
                <Button submit>Submit</Button>
              </div>
              <div style={{ marginLeft: "15px" }}>
                <Button onClick={resetForm}>Create New Product</Button>
              </div>
            </div>

            {errorMessage && (
              <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
            )}
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
});

export default ProductForm;
