

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface SettingsFormProps {
  type: "general" | "payments" | "notifications" | "security"
}

export function SettingsForm({ type }: SettingsFormProps) {
  if (type === "general") {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input id="platform-name" defaultValue="RentApp" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input id="support-email" defaultValue="support@rentapp.com" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="platform-description">Platform Description</Label>
          <Textarea
            id="platform-description"
            defaultValue="A modern rental platform connecting lenders and borrowers."
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="maintenance-mode" />
          <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
        </div>
        <Button>Save Changes</Button>
      </div>
    )
  }

  if (type === "payments") {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="commission-rate">Commission Rate (%)</Label>
            <Input id="commission-rate" type="number" defaultValue="10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="stripe-key">Stripe Public Key</Label>
          <Input id="stripe-key" placeholder="pk_test_..." />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="auto-payouts" defaultChecked />
          <Label htmlFor="auto-payouts">Enable Automatic Payouts</Label>
        </div>
        <Button>Save Changes</Button>
      </div>
    )
  }

  if (type === "notifications") {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="email-notifications" defaultChecked />
            <Label htmlFor="email-notifications">Email Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="sms-notifications" />
            <Label htmlFor="sms-notifications">SMS Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="push-notifications" defaultChecked />
            <Label htmlFor="push-notifications">Push Notifications</Label>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notification-email">Notification Email Template</Label>
          <Textarea id="notification-email" placeholder="Enter email template..." rows={6} />
        </div>
        <Button>Save Changes</Button>
      </div>
    )
  }

  if (type === "security") {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Input id="session-timeout" type="number" defaultValue="30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
            <Input id="max-login-attempts" type="number" defaultValue="5" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="two-factor" defaultChecked />
            <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="password-complexity" defaultChecked />
            <Label htmlFor="password-complexity">Enforce Password Complexity</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="audit-logging" defaultChecked />
            <Label htmlFor="audit-logging">Enable Audit Logging</Label>
          </div>
        </div>
        <Button>Save Changes</Button>
      </div>
    )
  }

  return null
}
