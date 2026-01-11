import {ChangeDetectorRef, Component, HostListener, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from "../../service/tasks.service";
import { Task } from "src/app/model/Task";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  maxVisiblePages: number = 5;

  currentSystem: string = 'MENDIX';
  currentPage: number = 1;
  pageSize: number = 5;

  searchKeyword: string = '';
  selectedStatus: string = '';
  selectedDate: string = '';

  currentLang: string = 'ar';
  isStatusDropdownOpen: boolean = false;

  uiLabels: any = {
    ar: {
      dir: 'rtl',
      statusLabelDefault: 'حالة المهمة',
      reset: 'إعادة تعيين',
      search: 'بحث',
      searchPlaceholder: 'بحث',
      headers: { id: 'رقم المهمة', title: 'عنوان المهمة', date: 'تاريخ الإنشاء', status: 'حالة المهمة', action: 'تفاصيل' },
      pagination: { next: 'التالي', prev: 'السابق', page: 'صفحة', of: 'من' },
      empty: 'لا توجد مهام',
      date:'اختر تاريخ'
    },
    en: {
      dir: 'ltr',
      statusLabelDefault: 'Task Status',
      reset: 'Reset',
      search: 'Search',
      searchPlaceholder: 'Search...',
      headers: { id: 'ID', title: 'Title', date: 'Created Date', status: 'Status', action: 'Details' },
      pagination: { next: 'Next', prev: 'Previous', page: 'Page', of: 'of' },
      empty: 'No tasks found',
      date:'choose date'
    }
  };

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}


  ngOnInit(): void {
    this.currentLang = this.getLiferayLanguage();
    this.route.queryParams.subscribe(params => {
      this.currentSystem = params['tab'] || 'MENDIX';
      this.currentPage = +params['page'] || 1;
      this.searchKeyword = params['search'] || '';
      this.selectedStatus = params['status'] || '';
      this.selectedDate = params['date'] || '';

      this._fetchTasksFromApi();
    });
  }

  getLiferayLanguage(): string {
    if ((window as any).Liferay && (window as any).Liferay.ThemeDisplay) {
      const langId = (window as any).Liferay.ThemeDisplay.getLanguageId();
      return langId.indexOf('ar') > -1 ? 'ar' : 'en';
    }

    return 'ar';
  }
  private _fetchTasksFromApi() {
    const filters = {
      searchString: this.searchKeyword,
      status: this.selectedStatus,
      date: this.selectedDate
    };

    this.tasksService.getTasks(this.currentSystem, this.currentPage, this.pageSize, filters)
      .subscribe({
        next: (res: any) => {
          console.log(' API Data Received');
          console.log(' Raw API Response:', res);
            this.tasks = res.Tasks;

          // Handle Pagination
          if(res.pagination) {
            this.totalItems = res.pagination.totalItems;
            this.totalPages = res.pagination.totalPages;
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(' API Error:', err);
          this.cdr.detectChanges();
        }
      });
  }


  switchTab(systemCode: string) {
    console.log('🖱️ CLICK DETECTED on tab:', systemCode);

    this.updateUrl({
      tab: systemCode,
      page: 1,
      search: null,
      status: null,
      date: null
    });
  }

  onSearch() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        tab: this.currentSystem,
        page: 1,
        search: this.searchKeyword || null,
        status: this.selectedStatus || null,
        date: this.selectedDate || null
      }
    });
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: newPage
        },
        queryParamsHandling: 'merge'
      });
    }
  }

  resetFilters() {
    this.searchKeyword = '';
    this.selectedStatus = '';
    this.selectedDate = '';

    this.cdr.detectChanges();
    // Clear URL params immediately
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        tab: this.currentSystem,
        page: 1,
        search: null,
        status: null,
        date: null
      }
    });
  }

  // Status Dropdown
  toggleStatusDropdown() {
    this.isStatusDropdownOpen = !this.isStatusDropdownOpen;
  }

  selectStatus(status: string) {
    this.selectedStatus = status;
    this.isStatusDropdownOpen = false;
  }


  private updateUrl(newParams: any) {
    console.log(' Navigating to:', newParams);

    this.zone.run(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: newParams,
        queryParamsHandling: 'merge'
      }).then(() => {
        this.cdr.detectChanges();
      });
    });
  }

  getStatusLabel(): string {
    if (this.selectedStatus) {
      const map: any = {
        'new': 'جديد',
        'Pending': 'معلق',
        'Completed': 'مكتمل',
        'Rejected': 'مرفوض',
        'In Progress': 'قيد التنفيذ',
        'Approved': 'مكتمل',
      };

      return this.currentLang === 'ar' ? (map[this.selectedStatus] || this.selectedStatus) : this.selectedStatus;
    }

    return this.uiLabels[this.currentLang].statusLabelDefault;
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'completed': return 'primary';
      case 'pending': return 'warning';
      case 'in progress': return 'warning';
      case 'rejected': return 'danger';
      case 'new': return 'info';
      case 'approved': return 'primary';
      case '': return 'info';
      default: return '';
    }
  }

  getTaskTitle(task: Task): string {
    return (this.currentLang === 'ar' && task.TaskTitleAR) ? task.TaskTitleAR : task.TaskTitleEN;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;


    if (target.matches('.calendar td[data-date]')) {
      const clickedDate = target.getAttribute('data-date');

      if (clickedDate) {
        console.log('Angular detected Theme Date Selection:', clickedDate);

        this.selectedDate = clickedDate;

        this.zone.run(() => {
          this.cdr.detectChanges();
        });
      }
    }
  }

  get paginationData() {
    const total = this.totalPages;
    const current = this.currentPage;
    const maxVisible = this.maxVisiblePages;

    let startPage = Math.max(1, current - 2);
    let endPage = Math.min(total, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return {
      startPage,
      endPage,
      pages,
      showFirst: startPage > 1,
      showFirstEllipsis: startPage > 2,
      showLast: endPage < total,
      showLastEllipsis: endPage < total - 1
    };
  }
}
