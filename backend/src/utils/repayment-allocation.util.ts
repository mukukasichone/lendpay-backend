export interface RepaymentAllocationResult {
  principalPaid: number;
  interestPaid: number;
  penaltyPaid: number;

  remainingPrincipal: number;
  remainingInterest: number;
  remainingPenalty: number;
}

export function allocateRepayment(
  amountPaid: number,
  outstandingPenalty: number,
  outstandingInterest: number,
  outstandingPrincipal: number
): RepaymentAllocationResult {
  let remainingPayment = amountPaid;

  let penaltyPaid = 0;
  let interestPaid = 0;
  let principalPaid = 0;

  let remainingPenalty = outstandingPenalty;
  let remainingInterest = outstandingInterest;
  let remainingPrincipal = outstandingPrincipal;

  // Pay penalty first
  if (remainingPayment > 0 && remainingPenalty > 0) {
    penaltyPaid = Math.min(
      remainingPayment,
      remainingPenalty
    );

    remainingPenalty -= penaltyPaid;
    remainingPayment -= penaltyPaid;
  }

  // Then interest
  if (remainingPayment > 0 && remainingInterest > 0) {
    interestPaid = Math.min(
      remainingPayment,
      remainingInterest
    );

    remainingInterest -= interestPaid;
    remainingPayment -= interestPaid;
  }

  // Finally principal
  if (remainingPayment > 0 && remainingPrincipal > 0) {
    principalPaid = Math.min(
      remainingPayment,
      remainingPrincipal
    );

    remainingPrincipal -= principalPaid;
    remainingPayment -= principalPaid;
  }

  return {
    principalPaid,
    interestPaid,
    penaltyPaid,
    remainingPrincipal,
    remainingInterest,
    remainingPenalty,
  };
}