import { useState } from "react";
import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Select, Text, VStack } from "@chakra-ui/react";

const API_BASE_URL = "https://api.color.pizza/v1";

const Index = () => {
  const [color, setColor] = useState("");
  const [colorName, setColorName] = useState("");
  const [colorList, setColorList] = useState("default");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setColorName("");

    try {
      const response = await fetch(`${API_BASE_URL}/?values=${color.replace("#", "")}&list=${colorList}`);

      if (!response.ok) {
        throw new Error("Failed to fetch color name");
      }

      const data = await response.json();
      setColorName(data.colors[0].name);
    } catch (error) {
      setError("Failed to fetch color name. Please check the color value and try again.");
    }
  };

  return (
    <Center h="100vh">
      <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <VStack spacing={6} align="stretch">
          <Heading size="xl">Color Name Translator</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="color">
              <FormLabel>Enter a color (hex value):</FormLabel>
              <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="e.g., #FF0000" />
            </FormControl>
            <FormControl id="colorList" mt={4}>
              <FormLabel>Select a color list:</FormLabel>
              <Select value={colorList} onChange={(e) => setColorList(e.target.value)}>
                <option value="default">Default</option>
                <option value="wikipedia">Wikipedia</option>
                <option value="ntc">NTC</option>
                {/* Add more color list options as needed */}
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={6}>
              Translate
            </Button>
          </form>
          {error && (
            <Text color="red.500" mt={4}>
              {error}
            </Text>
          )}
          {colorName && (
            <Box mt={8}>
              <Heading size="md">Color Name:</Heading>
              <Text fontSize="xl">{colorName}</Text>
              <Box mt={4} bg={color} h={100} borderRadius="md" />
            </Box>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default Index;
