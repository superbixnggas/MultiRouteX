const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

/**
 * Script untuk membaca storedValue dari MultiRouteX contract
 * Menjalankan: npx hardhat run scripts/read.js --network localhost
 */
async function main() {
  try {
    console.log("🔍 Reading MultiRouteX contract...");
    
    // Get contract factory
    const MultiRouteX = await hre.ethers.getContractFactory("MultiRouteX");
    
    // Get contract address from deployment (hardhat network)
    let contractAddress;
    try {
      const deploymentPath = path.join(__dirname, "..", "deployments", "hardhat", "MultiRouteX.json");
      if (fs.existsSync(deploymentPath)) {
        const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
        contractAddress = deployment.address;
      } else {
        throw new Error("Deployment file not found");
      }
    } catch (error) {
      console.log("⚠️  No deployment found. Please deploy contract first.");
      process.exit(1);
    }
    
    // Get contract instance
    const contract = await MultiRouteX.attach(contractAddress);
    
    // Read storedValue
    const storedValue = await contract.getValue();
    const owner = await contract.owner();
    
    console.log("\n📊 Contract Information:");
    console.log("   Address:", contractAddress);
    console.log("   Owner:", owner);
    console.log("   Stored Value:", storedValue.toString());
    
    // Check if there are any recent events
    console.log("\n🔔 Getting recent events...");
    
    // Get the last 5 ValueChanged events
    const filter = contract.filters.ValueChanged();
    const events = await contract.queryFilter(filter, -5); // Last 5 blocks
    
    if (events.length > 0) {
      console.log("📝 Recent ValueChanged events:");
      events.forEach((event, index) => {
        console.log(`   ${index + 1}. Block: ${event.blockNumber}, Old: ${event.args.oldValue}, New: ${event.args.newValue}`);
      });
    } else {
      console.log("   No ValueChanged events found.");
    }
    
  } catch (error) {
    console.error("❌ Error reading contract:", error.message);
    process.exit(1);
  }
}

// Execute main function
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { main };