import React, { useState } from 'react';
import { Button, Paper, Box, TextField } from '@mui/material';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);
  const [lastOperation, setLastOperation] = useState(null);
  const [lastNumber, setLastNumber] = useState(null);

  const handleNumber = (num) => {
    if (waitingForSecond || display === '0') {
      setDisplay(String(num));
      setWaitingForSecond(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForSecond) {
      setDisplay('0.');
      setWaitingForSecond(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);

    if (firstNumber !== null && operation !== null && !waitingForSecond) {
      // Perform calculation before setting new operation
      const result = calculate(firstNumber, current, operation);
      setDisplay(String(result));
      setFirstNumber(result);
      setLastNumber(current);
      setLastOperation(operation);
    } else {
      setFirstNumber(current);
    }

    setOperation(op);
    setWaitingForSecond(true);
  };

  const calculate = (first, second, op) => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
      default:
        return second;
    }
  };

  const handleEquals = () => {
    if (operation !== null && firstNumber !== null) {
      const current = parseFloat(display);
      const result = calculate(firstNumber, current, operation);
      setDisplay(String(result));
      setLastNumber(current);
      setLastOperation(operation);
      setFirstNumber(result);
      setOperation(null);
      setWaitingForSecond(true);
    } else if (lastOperation !== null && lastNumber !== null) {
      // Repeat last operation
      const current = parseFloat(display);
      const result = calculate(current, lastNumber, lastOperation);
      setDisplay(String(result));
      setFirstNumber(result);
      setWaitingForSecond(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setWaitingForSecond(false);
    setLastOperation(null);
    setLastNumber(null);
  };

  const NumberButton = ({ value }) => (
    <Button
      variant="contained"
      onClick={() => handleNumber(value)}
      className="number-button"
      sx={{
        backgroundColor: '#e0e0e0',
        color: '#000',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#d0d0d0',
        },
      }}
    >
      {value}
    </Button>
  );

  const OperationButton = ({ value, label }) => (
    <Button
      variant="contained"
      onClick={() => handleOperation(value)}
      className={operation === value && waitingForSecond ? 'operation-button highlighted' : 'operation-button'}
      sx={{
        backgroundColor: operation === value && waitingForSecond ? '#ff9800' : '#f57c00',
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#ef6c00',
        },
      }}
    >
      {label}
    </Button>
  );

  return (
    <Box className="calculator-container">
      <Paper elevation={3} className="calculator-paper">
        <TextField
          value={display}
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: true,
            style: {
              fontSize: '2rem',
              textAlign: 'right',
              color: '#fff',
              backgroundColor: '#333',
              fontWeight: 'bold',
            },
          }}
          sx={{
            marginBottom: '20px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#666',
                borderWidth: '2px',
              },
            },
          }}
        />

        <Box className="button-grid">
          <Button
            variant="contained"
            onClick={handleClear}
            className="clear-button"
            sx={{
              gridColumn: 'span 2',
              backgroundColor: '#d32f2f',
              color: '#fff',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#c62828',
              },
            }}
          >
            C
          </Button>
          <Box sx={{ gridColumn: 'span 2' }} />

          <NumberButton value={7} />
          <NumberButton value={8} />
          <NumberButton value={9} />
          <OperationButton value="/" label="÷" />

          <NumberButton value={4} />
          <NumberButton value={5} />
          <NumberButton value={6} />
          <OperationButton value="*" label="×" />

          <NumberButton value={1} />
          <NumberButton value={2} />
          <NumberButton value={3} />
          <OperationButton value="-" label="−" />

          <NumberButton value={0} />
          <Button
            variant="contained"
            onClick={handleDecimal}
            className="number-button"
            sx={{
              backgroundColor: '#e0e0e0',
              color: '#000',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#d0d0d0',
              },
            }}
          >
            .
          </Button>
          <Button
            variant="contained"
            onClick={handleEquals}
            className="equals-button"
            sx={{
              backgroundColor: '#4caf50',
              color: '#fff',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
          >
            =
          </Button>
          <OperationButton value="+" label="+" />
        </Box>
      </Paper>
    </Box>
  );
}

export default Calculator;