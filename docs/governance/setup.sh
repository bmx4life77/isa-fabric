#!/bin/bash

echo ""
echo "=============================================="
echo "     ISA Fabric — Environment Setup Script     "
echo "=============================================="
echo ""

# --- 1. Check Node.js version ----------------------------------------------
REQUIRED_NODE_MAJOR=18
NODE_VERSION=$(node -v 2>/dev/null)

if [ $? -ne 0 ]; then
  echo "❌ Node.js is not installed."
  echo "   Please install Node.js v18 or higher before continuing."
  exit 1
fi

NODE_MAJOR=$(echo $NODE_VERSION | sed 's/v\([0-9]*\).*/\1/')

if [ "$NODE_MAJOR" -lt "$REQUIRED_NODE_MAJOR" ]; then
  echo "❌ Node.js version $NODE_VERSION detected."
  echo "   ISA Fabric requires Node.js v18 or higher."
  exit 1
fi

echo "✔ Node.js version $NODE_VERSION detected."

# --- 2. Install dependencies ------------------------------------------------
echo ""
echo "📦 Installing project dependencies..."
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
  echo "❌ Dependency installation failed."
  exit 1
fi

echo "✔ Dependencies installed successfully."

# --- 3. Build the project ---------------------------------------------------
echo ""
echo "🔧 Building TypeScript project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed."
  exit 1
fi

echo "✔ Build completed."

# --- 4. Create ISA deployment directory ------------------------------------
echo ""
echo "📁 Ensuring .isa/deployments directory exists..."
mkdir -p .isa/deployments

echo "✔ Deployment directory ready."

# --- 5. Final message -------------------------------------------------------
echo ""
echo "🎉 ISA Fabric setup complete!"
echo "You can now run:"
echo "   npm run envelope"
echo "   npm run diagnostics"
echo ""
echo "As the project evolves, this script will be updated to:"
echo " - load domain packs"
echo " - initialize forecasting models (SB3)"
echo " - prepare SDG drift generators"
echo " - validate configs and datasets"
echo " - run smoke tests"
echo ""
echo "Welcome to the ISA Fabric ecosystem."
echo ""
#!/bin/bash

echo ""
echo "=============================================="
echo "     ISA Fabric — Environment Setup Script     "
echo "=============================================="
echo ""

# --- 1. Check Node.js version ----------------------------------------------
REQUIRED_NODE_MAJOR=18
NODE_VERSION=$(node -v 2>/dev/null)

if [ $? -ne 0 ]; then
  echo "❌ Node.js is not installed."
  echo "   Please install Node.js v18 or higher before continuing."
  exit 1
fi

NODE_MAJOR=$(echo $NODE_VERSION | sed 's/v\([0-9]*\).*/\1/')

if [ "$NODE_MAJOR" -lt "$REQUIRED_NODE_MAJOR" ]; then
  echo "❌ Node.js version $NODE_VERSION detected."
  echo "   ISA Fabric requires Node.js v18 or higher."
  exit 1
fi

echo "✔ Node.js version $NODE_VERSION detected."

# --- 2. Install dependencies ------------------------------------------------
echo ""
echo "📦 Installing project dependencies..."
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
  echo "❌ Dependency installation failed."
  exit 1
fi

echo "✔ Dependencies installed successfully."

# --- 3. Build the project ---------------------------------------------------
echo ""
echo "🔧 Building TypeScript project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed."
  exit 1
fi

echo "✔ Build completed."

# --- 4. Create ISA deployment directory ------------------------------------
echo ""
echo "📁 Ensuring .isa/deployments directory exists..."
mkdir -p .isa/deployments

echo "✔ Deployment directory ready."

# --- 5. Final message -------------------------------------------------------
echo ""
echo "🎉 ISA Fabric setup complete!"
echo "You can now run:"
echo "   npm run envelope"
echo "   npm run diagnostics"
echo ""
echo "As the project evolves, this script will be updated to:"
echo " - load domain packs"
echo " - initialize forecasting models (SB3)"
echo " - prepare SDG drift generators"
echo " - validate configs and datasets"
echo " - run smoke tests"
echo ""
echo "Welcome to the ISA Fabric ecosystem."
echo ""

