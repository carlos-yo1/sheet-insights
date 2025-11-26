import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatSettingsProps {
  webhookUrl: string;
  onWebhookUrlChange: (url: string) => void;
}

export const ChatSettings = ({ webhookUrl, onWebhookUrlChange }: ChatSettingsProps) => {
  const [tempUrl, setTempUrl] = useState(webhookUrl);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onWebhookUrlChange(tempUrl);
    localStorage.setItem("n8n_webhook_url", tempUrl);
    setOpen(false);
    toast({
      title: "Configurações salvas",
      description: "URL do webhook n8n configurada com sucesso.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Settings className="w-4 h-4" />
          {!webhookUrl && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurações do Chat</DialogTitle>
          <DialogDescription>
            Configure a URL do webhook do n8n para conectar o chat aos seus dados.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">URL do Webhook n8n</Label>
            <Input
              id="webhook-url"
              placeholder="https://seu-n8n.app/webhook/..."
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Cole aqui a URL do webhook do seu workflow n8n
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="gradient-primary">
            <Check className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
