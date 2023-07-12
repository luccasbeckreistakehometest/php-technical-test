import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { SaleItem } from '../types';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../styles/SalesPage.css'

interface SaleItem {
  productId: string;
  id: string;
  name: string;
  taxValue: number;
  categoryName: string;
  value: number;
  quantity?: number;
  subtotal?: number;
}

interface ItemRowProps {
  index: number;
  setSubtotals: React.Dispatch<React.SetStateAction<number[]>>;
  calculateTotalValue: () => void;
  onItemChange: (index: number, itemData: SaleItem) => void;
}

const ItemRow = ({ index, setSubtotals, calculateTotalValue, onItemChange }: ItemRowProps) => {
  const [productId, setProductId] = useState<string>();
  const [productQty, setProductQty] = useState<number | ''>(1);
  const [subtotal, setSubtotal] = useState(0);
  const [saleItem, setSaleItem] = useState<SaleItem>();

  useEffect(() => {
    handleProductIdChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    updateSubtotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleItem, productQty]);

  useEffect(() => {
    calculateTotalValue();
  }, [calculateTotalValue]);

  const updateSubtotal = () => {
    if (saleItem && productQty !== '' && productQty !== undefined && !isNaN(productQty)) {
      const newSubtotal = (saleItem.value + (saleItem.value * saleItem?.taxValue / 100)) * productQty;
      setSubtotal(newSubtotal);
      setSubtotals(prevSubtotals => {
        const updatedSubtotals = [...prevSubtotals];
        updatedSubtotals[index] = newSubtotal;
        return updatedSubtotals;
      });

      // Pass the item data to the parent component
      const itemData: SaleItem = {
        productId: saleItem.productId,
        id: saleItem.id,
        name: saleItem.name,
        taxValue: saleItem.taxValue,
        categoryName: saleItem.categoryName,
        value: saleItem.value,
        quantity: productQty,
        subtotal: newSubtotal,
      };
      onItemChange(index, itemData);
    }
  };

  const handleProductIdChange = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/app/api/products?id=${productId}`);
      const product = response.data ? response.data[0] : null;

      if (product) {
        setSaleItem({ 
          productId: product.id,
          id: product.id,
          name: product.name,
          taxValue: product.category_tax,
          categoryName: product.category_name,
          value: product.value,
        });
        setProductId(product.id);
      } else {
        setSaleItem({ 
          productId: '',
          id:'',
          name:'',
          taxValue:0,
          categoryName:'',
          value:0,
        });
        setProductId('');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === '') {
      setProductQty('');
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        setProductQty(parsedValue);
      }
    }
  };

  return (
    <table className="table">
    <tr>
      <td>
        <label className="label">ID</label>
      </td>
      <td>
        <label className="label">NAME</label>
      </td>
      <td>
        <label className="label">PRICE</label>
      </td>
      <td>
        <label className="label">CATEGORY</label>
      </td>
      <td>
        <label className="label">TAX VALUE</label>
      </td>
      <td>
        <label className="label">QUANTITY</label>
      </td>
      <td>
        <label className="label">SUBTOTAL</label>
      </td>
    </tr>
    <tr>
      <td>
        <input className="input" value={productId} onChange={(e) => setProductId(e.target.value)} />
      </td>
      <td>
        <p>{saleItem?.name}</p>
      </td>
      <td>
        <p>{saleItem?.value}</p>
      </td>
      <td>
        <p>{saleItem?.categoryName}</p>
      </td>
      <td>
        <p>{saleItem?.taxValue}</p>
      </td>
      <td>
        <input className="input" value={productQty} onChange={handleQuantityChange} />
      </td>
      <td>
        <p>{subtotal}</p>
      </td>
    </tr>
  </table>
  )
}
const PreviousSalesTable = () => {
  const [sales, setSales] = useState<any[]>([]); // Set initial value to an empty array

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:8000/app/api/sales');
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);

  // Filter out duplicate sales based on sale_id
  const uniqueSales = Array.from(new Set(sales.map((sale) => sale.sale_id)))
    .map((saleId) => sales.find((sale) => sale.sale_id === saleId));

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Sale ID</th>
          <th>Total Value</th>
        </tr>
      </thead>
      <tbody>
        {uniqueSales.map((sale) => (
          <tr key={sale.sale_id}>
            <td>{sale.sale_id}</td>
            <td>{sale.total_value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SalesPage = () => {
  const [itemsCount, setItemsCount] = useState(1);
  const [subtotals, setSubtotals] = useState<number[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [items, setItems] = useState<SaleItem[]>([]);
  const navigate = useNavigate();

  const goToWelcome = () => {
    navigate('/welcome');
  };

  const addItem = () => {
    setItemsCount(itemsCount + 1);
  };

  const calculateTotalValue = () => {
    const total = subtotals.reduce((acc, subtotal) => acc + subtotal, 0);
    setTotalValue(total);
  };

  const handleItemChange = (index: number, itemData: SaleItem) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index] = itemData;
      return updatedItems;
    });
  };

  const handleSaveSale = async () => {
    const saleItemsData = items.map(item => ({
      product_id: item.productId,
      quantity: item.quantity,
      tax_value: item.taxValue,
      subtotal: item.subtotal,
    }));

    const saleData = {
      total_value: totalValue,
      items: saleItemsData,
    };
  
    try {
      const response = await axios.post('http://localhost:8000/app/api/sales', saleData);
      if (response.status === 200) {
        console.log('Sale created successfully');
        // Reset form and state
        setItemsCount(1);
        setSubtotals([]);
        setTotalValue(0);
      }
    } catch (error) {
      console.error('Sale creation error:', error);
    }
  };

  return (
    <div className="sales-page">
     
      <PreviousSalesTable />
      {[...Array(itemsCount)].map((_, index) => (
        <ItemRow
          index={index}
          key={index}
          setSubtotals={setSubtotals}
          calculateTotalValue={calculateTotalValue}
          onItemChange={handleItemChange}
        />
      ))}
      <button className="button" onClick={addItem}>Add Item</button>
      <div className="total-value">Total Value: {totalValue}</div>
      <button className="button" onClick={handleSaveSale}>Save Sale</button>
      <button className="go-to-welcome" onClick={goToWelcome}>Go to Welcome Page</button>
    </div>
  );
}

export default SalesPage;
