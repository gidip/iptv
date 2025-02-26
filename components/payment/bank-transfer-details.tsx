"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface BankTransferDetailsProps {
  amount: number
  currency?: string
  bankDetails: {
    accountName: string
    accountNumber: string
    bankName: string
    swiftCode: string
    reference?: string
  }
  onClose?: () => void
}

export function BankTransferDetails({ amount, currency = "USD", bankDetails, onClose }: BankTransferDetailsProps) {
  const { toast } = useToast()

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`,
    })
  }

  const generatePDF = () => {
    // In a real app, this would generate a PDF with payment instructions
    toast({
      title: "Download started",
      description: "Your payment instructions are being downloaded.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bank Transfer Details</CardTitle>
        <CardDescription>
          Please use the following details to complete your bank transfer of{" "}
          <span className="font-medium">
            {amount.toFixed(2)} {currency}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border p-4">
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="font-medium">Bank Name:</dt>
              <dd className="flex items-center">
                {bankDetails.bankName}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-2"
                  onClick={() => handleCopy(bankDetails.bankName, "Bank name")}
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy bank name</span>
                </Button>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Account Name:</dt>
              <dd className="flex items-center">
                {bankDetails.accountName}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-2"
                  onClick={() => handleCopy(bankDetails.accountName, "Account name")}
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy account name</span>
                </Button>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Account Number:</dt>
              <dd className="flex items-center">
                {bankDetails.accountNumber}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-2"
                  onClick={() => handleCopy(bankDetails.accountNumber, "Account number")}
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy account number</span>
                </Button>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">SWIFT/BIC Code:</dt>
              <dd className="flex items-center">
                {bankDetails.swiftCode}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-2"
                  onClick={() => handleCopy(bankDetails.swiftCode, "SWIFT code")}
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy SWIFT code</span>
                </Button>
              </dd>
            </div>
            {bankDetails.reference && (
              <div className="flex justify-between">
                <dt className="font-medium">Payment Reference:</dt>
                <dd className="flex items-center">
                  {bankDetails.reference}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-2"
                    onClick={() => handleCopy(bankDetails.reference!, "Reference")}
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy reference</span>
                  </Button>
                </dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="font-medium">Amount:</dt>
              <dd className="font-bold">
                {amount.toFixed(2)} {currency}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-amber-50 text-amber-800 p-4 rounded-md text-sm">
          <p className="font-medium">Important:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Please include the payment reference in your bank transfer.</li>
            <li>Payments typically take 1-3 business days to process.</li>
            <li>Your subscription will be activated once payment is confirmed.</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button variant="outline" onClick={generatePDF}>
          <Download className="mr-2 h-4 w-4" />
          Download Instructions
        </Button>
      </CardFooter>
    </Card>
  )
}

