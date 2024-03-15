import usePurchaseTier3 from "@/hooks/usePurchaseTier3";
import { Flex, Box, Button } from "@chakra-ui/react";
import Image from "next/image";
import TestImage from "../../../public/test_image.png";
import useGetTier1Supply from "@/hooks/useGetTier1Supply";
import useGetTier2Supply from "@/hooks/useGetTier2Supply";
import useGetTier3Supply from "@/hooks/useGetTier3Supply";
import usePurchaseTier1 from "@/hooks/usePurchaseTier1";
import usePurchaseTier2 from "@/hooks/usePurchaseTier2";
import useAllownace from "@/hooks/useAllowance";
import useApprove from "@/hooks/useApprove";
import { useEffect, useMemo } from "react";
import useUpdateToTier2 from "@/hooks/useUpdateToTier2";
import useItemCounter from "@/hooks/useItemCounter";

const Tier = ({ tier, isWhitelisted }) => {
  const {
    onDecrease: onDecreaseTier1,
    onIncrease: onIncreaseTier1,
    amount: tier1,
    onReset: onResetTier1,
  } = useItemCounter();
  const {
    onDecrease: onDecreaseTier2,
    onIncrease: onIncreaseTier2,
    amount: tier2,
    onReset: onResetTier2,
  } = useItemCounter();
  const {
    onDecrease: onDecreaseTier3,
    onIncrease: onIncreaseTier3,
    amount: tier3,
    onReset: onResetTier3,
  } = useItemCounter();

  const { onPurchaseTier3, isPending: isPendingTier3 } = usePurchaseTier3();
  const { onPurchaseTier1, isPending: isPendingTier1 } = usePurchaseTier1();
  const { onPurchaseTier2, isPending: isPendingTier2 } = usePurchaseTier2();
  const { onUpdateToTier2, isPending: isPendingUpdate } = useUpdateToTier2();
  const { data: supplyTier1, refetch: refetchTier1 } = useGetTier1Supply();
  const { data: supplyTier2, refetch: refetchTier2 } = useGetTier2Supply();
  const { data: supplyTier3, refetch: refetchTier3 } = useGetTier3Supply();

  const { data: allowance, refetch: refetchAllowance } = useAllownace();
  const { onApproval, isPending: isPendingApproval } = useApprove();

  const handleClickTier = () => {
    if (!isPending) {
      if (tier.id === 3) {
        onPurchaseTier3(tier3);
      } else if (tier.id === 1) {
        onPurchaseTier1(tier1);
      } else if (tier.id === 2) {
        onPurchaseTier2(tier2);
      }
    }
  };

  const handleDecrease = () => {
    if (!isPending) {
      if (tier.id === 1) {
        onDecreaseTier1();
      } else if (tier.id === 2) {
        onDecreaseTier2();
      } else if (tier.id === 3) {
        onDecreaseTier3();
      }
    }
  };
  const handleIncrease = () => {
    if (!isPending) {
      if (tier.id === 1) {
        onIncreaseTier1();
      } else if (tier.id === 2) {
        onIncreaseTier2();
      } else if (tier.id === 3) {
        onIncreaseTier3();
      }
    }
  };

  const amount = useMemo(() => {
    if (tier.id === 1) {
      return tier1;
    } else if (tier.id === 2) {
      return tier2;
    } else if (tier.id === 3) {
      return tier3;
    }
  }, [tier1, tier2, tier3]);

  const handleClickApprove = () => {
    onApproval();
  };

  const handleClickUpgrade = () => {
    onUpdateToTier2();
  };
  const generateCurrentSupply = () => {
    if (tier.id === 1) {
      return supplyTier1 ? Number(supplyTier1) : 0;
    } else if (tier.id === 2) {
      return supplyTier2 ? Number(supplyTier2) : 0;
    } else if (tier.id === 3) {
      return supplyTier3 ? Number(supplyTier3) : 0;
    }
  };

  const isPending = isPendingTier1 || isPendingTier2 || isPendingTier3;

  const isDisabled =
    isPendingTier1 || isPendingTier2 || isPendingTier3 || isPendingApproval;

  useEffect(() => {
    refetchTier1?.();
    refetchTier2?.();
    refetchTier3?.();
    refetchAllowance?.();
  }, [isPending, isPendingApproval, isPendingUpdate]);

  return (
    <Flex
      w={{
        base: "100%",
        lg: "33.3%",
      }}
      position="relative"
      zIndex={1}
      key={tier.id}
      flexDir="column"
      paddingBottom={{
        base: 10,
        lg: 0,
      }}>
      <Flex
        position="relative"
        flexDir="column"
        p={5}
        position="relative"
        backgroundColor="transparent"
        borderLeft="2px solid rgba(255, 255, 255, 0.24)"
        borderRight="2px solid rgba(255, 255, 255, 0.24)"
        borderTop="2px solid rgba(255, 255, 255, 0.24)"
        overflow="hidden"
        flexDir="column">
        <Box
          position="absolute"
          zIndex={2}
          left="16px"
          top="16px"
          backgroundColor="rgba(255, 255, 255, 0.24)"
          padding={2}
          borderRadius={4}
          fontSize={{
            base: 12,
            lg: 14,
          }}
          border="1px solid white">
          {tier.title}
        </Box>

        <Box position="relative" zIndex={2}>
          <Image
            src={tier.img}
            alt={tier.title}
            width={{
              base: 200,
              md: 50,
            }}
          />
        </Box>

        <Flex
          zIndex={2}
          justify="center"
          fontWeight="bold"
          position="absolute"
          bottom="16px"
          left="50%"
          transform={"translateX(-50%)"}
          fontSize={{
            base: 16,
            lg: 22,
          }}>
          {tier.eth} ETH
        </Flex>
      </Flex>

      <Flex
        border="2px solid rgba(255, 255, 255, 0.24)"
        backgroundColor="#00000014"
        p={4}
        minH={{
          base: 150,
          lg: 200,
        }}
        flexDir="column"
        align="center"
        justify="space-between">
        <Box
          textAlign="center"
          fontSize={{
            base: 12,
            lg: 16,
          }}>
          {tier.description}
        </Box>

        <Box fontWeight="bold">
          {tier.totalSupply - generateCurrentSupply()}/{tier.totalSupply}
        </Box>
      </Flex>

      <Flex justify="center" align="center" mt="16px" gap={2}>
        <Flex
          justify="center"
          align="center"
          w="48px"
          height="48px"
          background="#CD1A64"
          borderRadius={4}
          onClick={handleDecrease}
          userSelect="none"
          cursor="pointer">
          -
        </Flex>
        <Flex
          color="black"
          justify="center"
          align="center"
          w="48px"
          height="48px"
          background="white"
          userSelect="none"
          borderRadius={4}>
          {amount}
        </Flex>
        <Flex
          justify="center"
          align="center"
          w="48px"
          height="48px"
          background="#CD1A64"
          borderRadius={4}
          onClick={handleIncrease}
          userSelect="none"
          cursor="pointer">
          +
        </Flex>
      </Flex>

      {isWhitelisted && (
        <Box>
          <Flex
            flexDir={{
              base: "column",
              md: tier.id === 3 ? "row" : "column",
            }}
            align="center"
            justify="center"
            gap={2}>
            <Flex flexDir="column" justify="center" align="center">
              <Button
                h="48px"
                mt={4}
                disabled={!isWhitelisted && isDisabled}
                textTransform="uppercase"
                backgroundColor="#CD1A64"
                transition="all .4s"
                width="100%"
                color="white"
                position="relative"
                overflow="hidden"
                _hover={{
                  _after: {
                    backgroundColor: "#CD1A64",
                  },
                }}
                onClick={handleClickTier}>
                {isPending ? "Loading..." : `Buy Tier ${tier.id}`}
              </Button>

              <Box
                height={{
                  base: 0,
                  md: "24px",
                }}
              />
            </Flex>

            {tier.id === 3 &&
              (allowance ? (
                <>
                  <Flex flexDir="column" justify="center" align="center">
                    <Button
                      disabled={!isWhitelisted && isPendingUpdate}
                      onClick={handleClickUpgrade}
                      h="48px"
                      mt={{
                        base: 0,
                        md: 4,
                      }}
                      textTransform="uppercase"
                      transition="all .4s"
                      _hover={{
                        _after: {
                          backgroundColor: "#c9a822",
                        },
                      }}
                      color="white"
                      backgroundColor="#cca310"
                      width="150px"
                      position="relative"
                      overflow="hidden">
                      {isPendingUpdate ? "Loading..." : "Buy & Upgrade"}
                    </Button>

                    <Box fontWeight="bold" position="relative" top="8px">
                      4000 DMT
                    </Box>
                  </Flex>
                </>
              ) : (
                <Flex flexDir="column" justify="center" align="center">
                  <Button
                    disabled={!isWhitelisted && isPendingApproval}
                    onClick={handleClickApprove}
                    h="48px"
                    mt={4}
                    textTransform="uppercase"
                    transition="all .4s"
                    _hover={{
                      _after: {
                        backgroundColor: "#c9a822",
                      },
                    }}
                    color="white"
                    backgroundColor="transparent"
                    width="150px"
                    position="relative"
                    overflow="hidden"
                    backgroundColor="#eabe10">
                    {isPendingApproval ? "Loading..." : "APPROVE"}
                  </Button>
                </Flex>
              ))}
          </Flex>
        </Box>
      )}

      <Flex
        justify="center"
        minH="22px"
        mt={{
          base: 2,
          lg: 5,
        }}>
        {tier.id === 3 && allowance && (
          <Flex
            fontSize={12}
            onClick={handleClickApprove}
            cursor="pointer"
            transition="all .4s"
            _hover={{
              color: "#CD1A64",
            }}>
            {isPendingApproval
              ? "Loading..."
              : "Do you want to approve more? Click here."}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Tier;
