const request = require("request");

const ATH = 20000; // All-Time High price for BTC
const targetProfit = 0.1; // Target profit for buy and sell orders

function getOnChainIndicators() {
  // Make a request to the Glassnode API to get the latest on-chain indicators for BTC
  request(
    "https://api.glassnode.com/v1/metrics/btc/onchain",
    (error, response, body) => {
      if (error) {
        console.error(error);
        return;
      }

      // Parse the response body as JSON
      const data = JSON.parse(body);

      // Get the current BTC price, drawdown from ATH, percentage of supply in profit,
      // net realized profit/loss, realized profits-to-value, and MVRV Z-score
      const price = data.price_usd;
      const drawdown = (ATH - price) / ATH;
      const supplyInProfit = data.supply_in_profit_percent;
      const netRealizedProfitLoss = data.realized_profit_loss;
      const realizedProfitsToValue = data.realized_profit_to_value;
      const mvrvZScore = data.mvrv_zscore;

      // Check if the current BTC price is below the target profit threshold
      if (drawdown > targetProfit) {
        console.log(
          "Current BTC price is below target profit threshold. Consider buying."
        );
      }

      // Check if the percentage of supply in profit is above 50%
      if (supplyInProfit > 50) {
        console.log(
          "Percentage of BTC supply in profit is above 50%. Consider selling."
        );
      }

      // Check if the net realized profit/loss is negative
      if (netRealizedProfitLoss < 0) {
        console.log(
          "Net realized profit/loss for BTC is negative. Consider selling."
        );
      }

      // Check if the realized profits-to-value is above 1.5
      if (realizedProfitsToValue > 1.5) {
        console.log(
          "Realized profits-to-value for BTC is above 1.5. Consider selling."
        );
      }

      // Check if the MVRV Z-score is above 3
      if (mvrvZScore > 3) {
        console.log("MVRV Z-score for BTC is above 3. Consider selling.");
      }
    }
  );
}

// Run the function to get the on-chain indicators and check for buy/sell signals every hour
setInterval(getOnChainIndicators, 36000005);
