import { useCallback, useState } from 'react';

const useItemCounter = () => {
  const [amount, setAmount] = useState(1);

  const onDecrease = useCallback(() => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  }, [amount]);

  const onIncrease = useCallback(() => {
    setAmount(amount + 1);
  }, [amount]);

  const onReset = useCallback(() => {
    setAmount(1);
  }, [amount]);

  return {
    amount,
    onDecrease,
    onIncrease,
    onReset,
  };
};

export default useItemCounter;
