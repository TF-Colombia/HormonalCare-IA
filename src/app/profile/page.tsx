"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Upload, X, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { FloatingChat } from "@/components/floating-chat";
import Image from "next/image";

interface ProfileData {
  name: string;
  age: number;
  gender: string;
  phone: string;
  specialty: string;
  rne: string;
  subspecialty: string;
}

interface CertificateImage {
  id: string;
  file: File;
  preview: string;
  name: string;
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Dr. Evelyn Reed",
    age: 42,
    gender: "Female",
    phone: "+1 234 567 890",
    specialty: "Endocrinology",
    rne: "12345",
    subspecialty: "Thyroid Disorders"
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<ProfileData>(profileData);
  
  // Certificate images state
  const [officialCertificates, setOfficialCertificates] = useState<CertificateImage[]>([]);
  const [otherCertificates, setOtherCertificates] = useState<CertificateImage[]>([]);
  
  // File input refs
  const officialFileRef = useRef<HTMLInputElement>(null);
  const otherFileRef = useRef<HTMLInputElement>(null);

  const handleSaveProfile = () => {
    setProfileData(editForm);
    setIsEditModalOpen(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleCancelEdit = () => {
    setEditForm(profileData);
    setIsEditModalOpen(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, certificateType: 'official' | 'other') => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newCertificates: CertificateImage[] = Array.from(files).map((file, index) => ({
      id: `${certificateType}-${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));

    if (certificateType === 'official') {
      setOfficialCertificates(prev => [...prev, ...newCertificates]);
      toast({
        title: "Official Certificate Added",
        description: `${newCertificates.length} certificate(s) uploaded successfully.`,
      });
    } else {
      setOtherCertificates(prev => [...prev, ...newCertificates]);
      toast({
        title: "Other Certificate Added",
        description: `${newCertificates.length} certificate(s) uploaded successfully.`,
      });
    }

    // Reset file input
    event.target.value = '';
  };

  const removeCertificate = (id: string, certificateType: 'official' | 'other') => {
    if (certificateType === 'official') {
      setOfficialCertificates(prev => {
        const certificate = prev.find(cert => cert.id === id);
        if (certificate) {
          URL.revokeObjectURL(certificate.preview);
        }
        return prev.filter(cert => cert.id !== id);
      });
    } else {
      setOtherCertificates(prev => {
        const certificate = prev.find(cert => cert.id === id);
        if (certificate) {
          URL.revokeObjectURL(certificate.preview);
        }
        return prev.filter(cert => cert.id !== id);
      });
    }

    toast({
      title: "Certificate Removed",
      description: "Certificate has been removed successfully.",
    });
  };

  const triggerFileUpload = (certificateType: 'official' | 'other') => {
    if (certificateType === 'official') {
      officialFileRef.current?.click();
    } else {
      otherFileRef.current?.click();
    }
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-4 border-b p-4">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your professional profile and information.</p>
        </div>
      </header>
      
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Professional Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Image */}
                <div className="w-full md:w-1/3 flex justify-center">
                  <Avatar className="h-40 w-40">
                    <AvatarImage 
                      src="https://placehold.co/100x100.png" 
                      alt={profileData.name}
                    />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                </div>

                {/* Profile Information */}
                <div className="w-full md:w-2/3">
                  <h2 className="text-3xl font-bold text-center md:text-left mb-6">{profileData.name}</h2>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground font-medium">Age</span>
                      <span className="font-semibold">{profileData.age}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground font-medium">Gender</span>
                      <span className="font-semibold">{profileData.gender}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground font-medium">Phone</span>
                      <span className="font-semibold">{profileData.phone}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground font-medium">Specialty</span>
                      <span className="font-semibold">{profileData.specialty}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground font-medium">RNE</span>
                      <span className="font-semibold">{profileData.rne}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground font-medium">Subspecialty</span>
                      <span className="font-semibold">{profileData.subspecialty}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Official Certificates Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Official Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Existing certificates */}
                  {officialCertificates.map((certificate) => (
                    <div key={certificate.id} className="relative w-full h-[100px] bg-muted rounded-lg overflow-hidden group">
                      <Image
                        src={certificate.preview}
                        alt={certificate.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8"
                            onClick={() => window.open(certificate.preview, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-8 w-8"
                            onClick={() => removeCertificate(certificate.id, 'official')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded truncate">
                          {certificate.name}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add certificate button */}
                  <div className="w-full h-[100px] bg-muted rounded-lg p-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => triggerFileUpload('official')}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Add Image
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">Click to upload</p>
                  </div>
                </div>
                
                {/* Hidden file input for official certificates */}
                <input
                  ref={officialFileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(e, 'official')}
                  className="hidden"
                />
              </CardContent>
            </Card>
          </div>

          {/* Other Certificates Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Other Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Existing certificates */}
                  {otherCertificates.map((certificate) => (
                    <div key={certificate.id} className="relative w-full h-[100px] bg-muted rounded-lg overflow-hidden group">
                      <Image
                        src={certificate.preview}
                        alt={certificate.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8"
                            onClick={() => window.open(certificate.preview, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-8 w-8"
                            onClick={() => removeCertificate(certificate.id, 'other')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded truncate">
                          {certificate.name}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add certificate button */}
                  <div className="w-full h-[100px] bg-muted rounded-lg p-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => triggerFileUpload('other')}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Add Image
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">Click to upload</p>
                  </div>
                </div>
                
                {/* Hidden file input for other certificates */}
                <input
                  ref={otherFileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(e, 'other')}
                  className="hidden"
                />
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-8 gap-4">
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-age">Age</Label>
                    <Input
                      id="edit-age"
                      type="number"
                      value={editForm.age}
                      onChange={(e) => setEditForm({ ...editForm, age: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-gender">Gender</Label>
                    <Select value={editForm.gender} onValueChange={(value) => setEditForm({ ...editForm, gender: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-phone">Phone</Label>
                    <Input
                      id="edit-phone"
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-specialty">Specialty</Label>
                    <Input
                      id="edit-specialty"
                      value={editForm.specialty}
                      onChange={(e) => setEditForm({ ...editForm, specialty: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-rne">RNE</Label>
                    <Input
                      id="edit-rne"
                      value={editForm.rne}
                      onChange={(e) => setEditForm({ ...editForm, rne: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-subspecialty">Subspecialty</Label>
                    <Input
                      id="edit-subspecialty"
                      value={editForm.subspecialty}
                      onChange={(e) => setEditForm({ ...editForm, subspecialty: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="destructive">
              Logout
            </Button>
          </div>
        </div>
      </main>

      {/* Chat asistente flotante para consultas generales */}
      <FloatingChat />
    </div>
  );
} 