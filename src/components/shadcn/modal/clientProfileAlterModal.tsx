import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../../ui/label";
import { useState } from "react";

interface Client {
  companyName: string,
  location: string,
  description: string,
  numberOfEmployees: number,
  since: number
}


export const ClientProfileAlter = ({clientId, type}: {clientId: string, type: string}) => {

const [clientData, setClientData] = useState<Client>({
  companyName: "",
  location: "",
  description: "",
  numberOfEmployees: 0,
  since: 0
});
const [formData, setFormData] = useState<Client>({
    companyName: "",
    location: "",
    description: "",
    numberOfEmployees: 0,
    since: 0
  });



   
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-transparent font-bold text-lg'> {type} </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] h-[800px] justify-center">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-44">
            <Label htmlFor="name" className="text-right">
              CompanyName
            </Label>
            <Input id="name" name="companyName" className="col-span-3" />
          </div>

        
          <div className="grid grid-cols-4 items-center gap-44">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Input id="name" name="description" className="col-span-3" />
          </div>

        
          <div className="grid grid-cols-4 items-center gap-44">
            <Label htmlFor="name" className="text-right">
              Loacation
            </Label>
            <Input id="name" name="location" className="col-span-3" />
          </div>

        
          <div className="grid grid-cols-4 items-center gap-44">
            <Label htmlFor="name" className="text-right">
              Domain
            </Label>
            <Input id="name" name="domain" className="col-span-3" />
          </div>

        
          <div className="grid grid-cols-4 items-center gap-44">
            <Label htmlFor="name" className="text-right">
              Since
            </Label>
            <Input id="name" name="since" className="col-span-3" />
          </div>

        
          <div className="grid grid-cols-4 items-center gap-44">
            <Label htmlFor="name" className="text-right">
              Total Employees
            </Label>
            <Input id="name" name="numberOfEmployees" className="col-span-3" />
          </div>

        
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
