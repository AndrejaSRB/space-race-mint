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
import { useEffect } from "react";
import useUpdateToTier2 from "@/hooks/useUpdateToTier2";

const Tier = ({ tier, isWhitelisted }) => {
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
        onPurchaseTier3();
      } else if (tier.id === 1) {
        onPurchaseTier1();
      } else if (tier.id === 2) {
        onPurchaseTier2();
      }
    }
  };

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

  const isPending =
    isPendingTier1 || isPendingTier2 || isPendingTier3 || isPendingApproval;

  useEffect(() => {
    refetchTier1?.();
    refetchTier2?.();
    refetchTier3?.();
    refetchAllowance?.();
  }, [isPending]);

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
        borderLeft="1px solid rgba(255, 255, 255, 0.24)"
        overflow="hidden"
        flexDir="column"
        _before={{
          content: "''",
          height: "20%",
          width: "calc(100% - 2px)",
          top: "0px",
          border: "2px solid rgba(255, 255, 255, 0.24)",
          borderWidth: "2px 3px 0px 0px",
          transform: "skew(45deg)",
          transformOrigin: "right bottom",
          position: "absolute",
          left: 0,
          zIndex: -1,
        }}
        _after={{
          content: "''",
          width: "calc(100% - 4px)",
          bottom: "0px",
          borderR: "2px solid rgba(255, 255, 255, 0.24)",
          position: "absolute",
          left: "0",
        }}>
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

      {isWhitelisted && (
        <Box
          minH={{
            base: "auto",
            lg: "140px",
          }}>
          <Flex
            flexDir={{
              base: "column",
              md: tier.id === 3 ? "row" : "column",
            }}
            align="center"
            gap={2}>
            <Flex flexDir="column" justify="center" align="center">
              <Button
                h="48px"
                mt={4}
                disabled={!isWhitelisted && isPending}
                textTransform="uppercase"
                backgroundColor="#CD1A64"
                transition="all .4s"
                width="150px"
                color="white"
                position="relative"
                overflow="hidden"
                _hover={{
                  _after: {
                    backgroundColor: "#CD1A64",
                  },
                }}
                width="150px"
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
                      {isPending ? "Loading..." : "Buy & Upgrade"}
                    </Button>

                    <Box fontWeight="bold" position="relative" top="8px">
                      4000 DMT
                    </Box>
                  </Flex>
                </>
              ) : (
                <Flex flexDir="column" justify="center" align="center">
                  <Button
                    disabled={!isWhitelisted && isPending}
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
                    {isPending ? "Loading..." : "APPROVE"}
                  </Button>
                  <Box
                    height={{
                      base: 0,
                      md: "24px",
                    }}
                  />
                </Flex>
              ))}
          </Flex>
        </Box>
      )}
      {tier.id === 3 && allowance && <Flex fontSize={12} mt={4} onClick={handleClickApprove} cursor="pointer">Do you want to approve more? Click here.</Flex>}
    </Flex>
  );
};

export default Tier;
