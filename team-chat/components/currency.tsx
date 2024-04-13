interface CurrencyProps {
  value: number;
}

const Currency = ({ value }: CurrencyProps) => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return <span>{formattedValue}</span>;
};

export default Currency;
