import React from 'react';
import { Button as ShadButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Pagination } from '@/components/ui/pagination';
import { Toast } from '@/components/ui/toast';
import { Loader2 } from 'lucide-react';

export const Button = ({ variant = 'default', children, onClick, disabled }) => (
    <ShadButton variant={variant} onClick={onClick} disabled={disabled}>
        {children}
    </ShadButton>
);

export const InputField = ({ type = 'text', placeholder, value, onChange, label, error }) => (
    <div>
        {label && <label>{label}</label>}
        <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

export const CustomCard = ({ title, content, footer }) => (
    <Card>
        {title && <h3 className="text-xl font-semibold p-2">{title}</h3>}
        <CardContent>{content}</CardContent>
        {footer && <div className="p-2">{footer}</div>}
    </Card>
);

export const Modal = ({ isOpen, title, children, onClose }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            {title && <DialogTitle>{title}</DialogTitle>}
            {children}
        </DialogContent>
    </Dialog>
);

export const CustomLoader = () => (
    <div className="flex justify-center items-center">
        <Loader2 className="animate-spin" />
    </div>
);

export const CustomPagination = ({ totalPages, currentPage, onPageChange }) => (
    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
);

export const Notification = ({ message, type, onClose }) => (
    <Toast variant={type} title={message} action={<button onClick={onClose}>Close</button>} />
);

export const Form = ({ children, onSubmit }) => (
    <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <Button type="submit">Submit</Button>
    </form>
);

export const SelectDropdown = ({ options, value, onChange, label }) => (
    <div>
        {label && <label>{label}</label>}
        <select value={value} onChange={onChange} className="border p-2 w-full rounded-lg">
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);
