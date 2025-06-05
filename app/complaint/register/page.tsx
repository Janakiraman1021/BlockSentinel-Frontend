"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Upload, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnimatedBackground } from "@/components/animated-background"
import { EvidenceHash } from "@/components/evidence-hash"
import Logo from "@/components/logo"

export default function ComplaintRegistration() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    incidentDate: "",
    incidentType: "",
    description: "",
    evidenceFiles: [],
    witnesses: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    // In a real app, we would handle file uploads here
    setFormData((prev) => ({ ...prev, evidenceFiles: [...prev.evidenceFiles, { name: e.target.files[0].name }] }))
  }

  const handleAddWitness = () => {
    setFormData((prev) => ({
      ...prev,
      witnesses: [...prev.witnesses, { name: "", contact: "", statement: "" }],
    }))
  }

  const handleWitnessChange = (index, field, value) => {
    const updatedWitnesses = [...formData.witnesses]
    updatedWitnesses[index] = { ...updatedWitnesses[index], [field]: value }
    setFormData((prev) => ({ ...prev, witnesses: updatedWitnesses }))
  }

  const nextStep = () => {
    const newStep = step + 1
    setStep(newStep)
    setProgress(newStep * 25)
  }

  const prevStep = () => {
    const newStep = step - 1
    setStep(newStep)
    setProgress(newStep * 25)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        window.location.href = "/complaint/success"
      }, 2000)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />

      <div className="container mx-auto py-12 px-4 relative z-10">
        <div className="flex items-center justify-center mb-8">
          <Logo size="large" />
          <h1 className="text-3xl font-bold ml-3 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
            BlockSentinel
          </h1>
        </div>

        <Card className="w-full max-w-4xl mx-auto bg-black/40 border-orange-500/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-500 flex items-center">
              <Shield className="mr-2 h-6 w-6" />
              Cybercrime Complaint Registration
            </CardTitle>
            <CardDescription className="text-gray-400">
              All information is securely stored and verified using blockchain technology
            </CardDescription>
            <Progress value={progress} className="h-2 bg-gray-800" indicatorClassName="bg-orange-500" />
          </CardHeader>

          <CardContent>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Complaint Registered Successfully!</h2>
                <p className="text-gray-400 mb-6 text-center">
                  Your complaint has been securely recorded on our blockchain. Redirecting to your dashboard...
                </p>
                <EvidenceHash hash="0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069" />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="bg-gray-900/50 border-gray-700"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          className="bg-gray-900/50 border-gray-700"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="bg-gray-900/50 border-gray-700"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your address"
                          className="bg-gray-900/50 border-gray-700"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Incident Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="incidentDate">Date of Incident</Label>
                        <Input
                          id="incidentDate"
                          name="incidentDate"
                          type="date"
                          value={formData.incidentDate}
                          onChange={handleChange}
                          className="bg-gray-900/50 border-gray-700"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="incidentType">Type of Cybercrime</Label>
                        <Select
                          value={formData.incidentType}
                          onValueChange={(value) => handleSelectChange("incidentType", value)}
                        >
                          <SelectTrigger className="bg-gray-900/50 border-gray-700">
                            <SelectValue placeholder="Select type of cybercrime" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phishing">Phishing Attack</SelectItem>
                            <SelectItem value="ransomware">Ransomware</SelectItem>
                            <SelectItem value="identity_theft">Identity Theft</SelectItem>
                            <SelectItem value="data_breach">Data Breach</SelectItem>
                            <SelectItem value="online_harassment">Online Harassment</SelectItem>
                            <SelectItem value="financial_fraud">Financial Fraud</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Detailed Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Provide a detailed description of the incident"
                        className="min-h-[150px] bg-gray-900/50 border-gray-700"
                        required
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Evidence Upload</h2>
                    <Alert className="bg-blue-900/20 border-blue-500/30">
                      <AlertCircle className="h-4 w-4 text-blue-500" />
                      <AlertTitle>Secure Evidence Storage</AlertTitle>
                      <AlertDescription>
                        All evidence is cryptographically hashed and stored on our secure blockchain network.
                      </AlertDescription>
                    </Alert>

                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-orange-500/50 transition-colors">
                      <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                      <p className="mb-2">Drag and drop files here or click to browse</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Supports images, documents, videos, and audio files (max 50MB)
                      </p>
                      <Input id="evidence" type="file" className="hidden" onChange={handleFileChange} multiple />
                      <Button
                        type="button"
                        variant="outline"
                        className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10"
                        onClick={() => document.getElementById("evidence").click()}
                      >
                        Select Files
                      </Button>
                    </div>

                    {formData.evidenceFiles.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">Uploaded Files:</h3>
                        <ScrollArea className="h-[100px] rounded-md border border-gray-700 p-2">
                          <ul className="space-y-2">
                            {formData.evidenceFiles.map((file, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                {file.name}
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </div>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Witness Information (Optional)</h2>

                    {formData.witnesses.map((witness, index) => (
                      <div key={index} className="p-4 border border-gray-700 rounded-lg mb-4">
                        <h3 className="text-md font-medium mb-3">Witness #{index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor={`witness-name-${index}`}>Name</Label>
                            <Input
                              id={`witness-name-${index}`}
                              value={witness.name}
                              onChange={(e) => handleWitnessChange(index, "name", e.target.value)}
                              placeholder="Witness name"
                              className="bg-gray-900/50 border-gray-700"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`witness-contact-${index}`}>Contact</Label>
                            <Input
                              id={`witness-contact-${index}`}
                              value={witness.contact}
                              onChange={(e) => handleWitnessChange(index, "contact", e.target.value)}
                              placeholder="Email or phone"
                              className="bg-gray-900/50 border-gray-700"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`witness-statement-${index}`}>Statement</Label>
                          <Textarea
                            id={`witness-statement-${index}`}
                            value={witness.statement}
                            onChange={(e) => handleWitnessChange(index, "statement", e.target.value)}
                            placeholder="Witness statement"
                            className="bg-gray-900/50 border-gray-700"
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10"
                      onClick={handleAddWitness}
                    >
                      + Add Witness
                    </Button>

                    <Separator className="my-6 bg-gray-800" />

                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Review & Submit</h2>
                      <p className="text-gray-400">
                        Please review all information before submitting. Once submitted, your complaint will be
                        cryptographically secured on our blockchain and cannot be altered.
                      </p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="confirm"
                          className="rounded border-gray-700 bg-gray-900/50 text-orange-500 focus:ring-orange-500"
                          required
                        />
                        <Label htmlFor="confirm" className="text-sm">
                          I confirm that all information provided is accurate to the best of my knowledge
                        </Label>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            )}
          </CardContent>

          {!isSuccess && (
            <CardFooter className="flex justify-between border-t border-gray-800 pt-6">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={prevStep}
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {step < 4 ? (
                <Button type="button" className="bg-orange-500 hover:bg-orange-600 text-white" onClick={nextStep}>
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Submit Complaint"}
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
