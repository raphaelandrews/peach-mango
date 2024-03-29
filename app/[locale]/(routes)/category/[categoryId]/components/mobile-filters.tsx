"use client";

import { useState } from "react";
import {useTranslations} from 'next-intl';
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";
import { Country, Subcategory } from "@/types";

import Filter from "./filter";

interface MobileFiltersProps {
  subcategories: Subcategory[],
  countries: Country[],
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  subcategories,
  countries
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations('CategoryPage');

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={onOpen}
        className="flex items-center gap-x-2 lg:hidden"
      >
        Filters
        <Plus size={20} />
      </Button>

      <Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose}>

        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-opacity-25" />

        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto py-4 pb-6 shadow-xl">

            {/* Close button */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            
            <div className="p-4">
              <Filter
                valueKey="subcategoryId"
                name={t('subcategories')}
                data={subcategories}
              />
              <Filter
                valueKey="countryId"
                name={t('countries')}
                data={countries}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
